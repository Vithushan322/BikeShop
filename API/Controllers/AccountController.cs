using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;

        public AccountController(
            DataContext context, 
            ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        #region POST
        [HttpPost("register")]
        //[Authorize]
        public async Task<ActionResult<UserDTO>> Regiester(RegisterDTO registerDTO)
        {
            if (await UserExists(registerDTO.Email)) return BadRequest("Username is taken");

            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                Email = registerDTO.Email.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.Password)),
                PasswordSalt = hmac.Key,
                FirstName = registerDTO.FirstName,
                LastName = registerDTO.LastName,  
                Location = registerDTO.Location
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserDTO
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Token = _tokenService.CreateToken(user),
                Location = user.Location
            };
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == loginDTO.Email);

            if (user == null) return Unauthorized("Invalid Username");

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password");
            }

            return new UserDTO
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Token = _tokenService.CreateToken(user),
                Location = user.Location
            };
        }
        #endregion

        private async Task<bool> UserExists(string email)
        {
            return await _context.Users.AnyAsync(x => x.Email == email.ToLower());
        }
    }
}
