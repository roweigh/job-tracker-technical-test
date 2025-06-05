using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JobApplicationApi.Models;
using JobApplicationApi.Repositories;

namespace JobApplicationApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class applicationsController : ControllerBase
    {
        private readonly IApplicationRepository _repository;

        public applicationsController(IApplicationRepository repository)
        {
            _repository = repository;
        }

        // GET: api/applications
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobApplication>>> GetJobApplication()
        {
            var applications = await _repository.GetAll();
            return Ok(applications);
        }

        // GET: api/applications/5
        [HttpGet("{id}")]
        public async Task<ActionResult<JobApplication>> GetJobApplication(int id)
        {
            var jobApplication = await _repository.Get(id);

            if (jobApplication == null)
            {
                return NotFound();
            }

            return jobApplication;
        }

        // PUT: api/applications/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJobApplication(int id, JobApplication jobApplication)
        {
            if (id != jobApplication.id)
            {
                return BadRequest();
            }

            try
            {
                await _repository.Put(id, jobApplication);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JobApplicationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/applications
        [HttpPost]
        public async Task<ActionResult<JobApplication>> PostJobApplication(JobApplication jobApplication)
        {
            await _repository.Post(jobApplication);
            return CreatedAtAction("GetJobApplication", new { id = jobApplication.id }, jobApplication);
        }

        private bool JobApplicationExists(int id)
        {
            return _repository.Exists(id);
        }
    }
}
