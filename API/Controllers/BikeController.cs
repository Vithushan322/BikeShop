using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helper;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class BikeController : BaseApiController
    {
        private readonly IBikeRepository _bikeRepository;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        private readonly DataContext _context;

        public BikeController(
               DataContext context,
               IMapper mapper,
               IPhotoService photoService)
        {
            _context = context;
            _mapper = mapper;
            _photoService = photoService;
        }

        #region GET
        [HttpGet]
        public async Task<ActionResult<PagedList<BikeDTO>>> GetBikes([FromQuery]UserParams userParams)
        {
            var querry = _context.Bikes
               .ProjectTo<BikeDTO>(_mapper.ConfigurationProvider)
               .AsNoTracking();

            var bikes =  await PagedList<BikeDTO>.CreateAsync(querry, userParams.PageNumber, userParams.PageSize);

            Response.AddPaginationHeader(new PaginationHeader(bikes.CurrentPage, bikes.PageSize, bikes.TotalCount, bikes.TotalPages));

            return Ok(bikes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BikeDTO>> GetBikeByID(int id)
        {
            if (id <= 0) return BadRequest();

            //return await _context.Bikes
            //    .Include(p => p.Photos)
            //    .FirstOrDefaultAsync(x => x.Id == id);
            return Ok(await _context.Bikes
                .ProjectTo<BikeDTO>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == id));
        }

        [HttpGet("name/{name}")]
        public async Task<ActionResult<IEnumerable<BikeDTO>>> GetBikeByName(string name)
        {
            return Ok(await _context.Bikes
               .Where(x => x.Name.ToLower().Contains(name.ToLower()))
               .ProjectTo<BikeDTO>(_mapper.ConfigurationProvider)
               .ToListAsync());
        }

        [HttpGet("ref-number/{refNumber}")]
        public async Task<ActionResult<IEnumerable<BikeDTO>>> GetBikeByRefNumber(string refNumber)
        {
            return Ok(await _context.Bikes
                .Where(x => x.ReferenceNumber.ToLower().Contains(refNumber.ToLower()))
                .ProjectTo<BikeDTO>(_mapper.ConfigurationProvider)
                .ToListAsync());
        }
        #endregion

        #region POST
        [HttpPost("add-photo/{bikeId}")]
        public async Task<ActionResult<PhotoDTO>> AddPhoto(int bikeId, IFormFile file)
        {
            if (file == null) return BadRequest();
            if (bikeId <= 0) return BadRequest();

            var bike = await _context.Bikes
                .Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.Id == bikeId);

            if (bike == null) return NotFound();

            var result = await _photoService.AddPhotoAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            if (bike.Photos.Count == 0) photo.IsMain = true;

            bike.Photos.Add(photo);

            if (await _context.SaveChangesAsync() > 0) return _mapper.Map<PhotoDTO>(photo);

            return BadRequest("Problem adding photo");
        }
        #endregion

        #region DELETE
        [HttpDelete("{bikeId}")]
        public async Task<ActionResult> DeleteBike(int bikeId)
        {
            if (bikeId <= 0) return BadRequest();

            var bike = await _context.Bikes.FirstOrDefaultAsync(x => x.Id == bikeId);
            if (bike == null) return NotFound();

            _context.Bikes.Remove(bike);

            if (await _context.SaveChangesAsync() > 0) return Ok();

            return BadRequest("Issue with the date");
        }

        [HttpDelete("delete-photo/{photoId}")]
        public async Task<ActionResult> DeletePhoto(int photoId)
        {
            if (photoId <= 0) return BadRequest();

            var photo = await _context.Photos.FirstOrDefaultAsync(x => x.Id == photoId);
            if (photo == null) return NotFound();
            if (photo.IsMain) return BadRequest("You can not delete your main photo");

            var bike = await _context.Bikes.Include(p => p.Photos).FirstOrDefaultAsync(x => x.Id == photo.BikeId);
            if (bike == null) return NotFound();

            if (photo.PublicId != null)
            {
                var result = await _photoService.DeletePhotoAsync(photo.PublicId);
                if (result.Error != null) return BadRequest(result.Error.Message);
            }

            bike.Photos.Remove(photo);

            if (await _context.SaveChangesAsync() > 0) return Ok();

            return BadRequest("Issue with the data");
        }
        #endregion

        #region PUT
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateBike(int id, UpdateBikeDTO updateBikeDTO)
        {
            if (id <= 0) return BadRequest();
            if (updateBikeDTO == null) return BadRequest();

            var bike = await _context.Bikes.FirstOrDefaultAsync(x => x.Id == id);

            if (bike == null) return NotFound();

            _mapper.Map(updateBikeDTO, bike);

            if (await _context.SaveChangesAsync() > 0) return NoContent();

            return BadRequest("Failed to update bike");
        }

        [HttpPut("set-main-photo/{photoId}")]
        public async Task<ActionResult> SetMainPhoto(int photoId)
        {
            if (photoId <= 0) return BadRequest();

            var photo = await _context.Photos.FirstOrDefaultAsync(x => x.Id == photoId);
            if (photo == null) return NotFound();
            if (photo.IsMain) return BadRequest("Already a main picture");

            var bike = await _context.Bikes.Include(p => p.Photos).FirstOrDefaultAsync(x => x.Id == photo.BikeId);
            if (bike == null) return NotFound();

            var currentMainPhoto = bike.Photos.FirstOrDefault(x => x.IsMain);
            if (currentMainPhoto != null) currentMainPhoto.IsMain = false;
            photo.IsMain = true;

            if (await _context.SaveChangesAsync() > 0) return NoContent();

            return BadRequest("Issue with the data");
        }

        #endregion

        #region PATCH
        [HttpPatch("{id}")]
        public async Task<ActionResult> UpdatePartialVilla(int id, JsonPatchDocument<UpdateBikeDTO> patchBikeDTO)
        {
            if (patchBikeDTO == null) return BadRequest();

            var bike = await _context.Bikes.FirstOrDefaultAsync(x => x.Id == id);

            if (bike == null) return NotFound();

            UpdateBikeDTO updateBikeDTO = _mapper.Map<UpdateBikeDTO>(bike);

            patchBikeDTO.ApplyTo(updateBikeDTO);

            _mapper.Map(updateBikeDTO, bike);

            if (await _context.SaveChangesAsync() > 0) return NoContent();

            return BadRequest("Failed to update bike");
        }
        #endregion
    }
}
