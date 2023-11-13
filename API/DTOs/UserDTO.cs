using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class UserDTO : User
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Token { get; set; }
    }

    public class RegisterDTO : User
    {
        [Required]
        [StringLength(8, MinimumLength = 4)]
        public string Password { get; set; }
    }
    public class LoginDTO
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }

    public class User
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        [StringLength(maximumLength: 20)]
        public string Location { get; set; }
    }
}
