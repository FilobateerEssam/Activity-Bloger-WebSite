using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            // Where we are going From to where we are going to 

            //          From        to
            CreateMap<Activity , Activity>();
            
        }
    }
}