import React from 'react'
import { TeamCard } from '../components/general/TeamCard'

export default function Team() {

  const teamBatch2026 = [
    { name: "Adarsh Landge", post: "Web Head" },
    { name: "Animesh Bhawsar", post: "Joint Secretary" },
    { name: "Riya Chaturvedi", post: "Joint Secretary" },
    { name: "Pranav Makwana", post: "Treasurer" },
    { name: "Aishwarya Choubey", post: "Creative Head" },
    { name: "Daksh Verma", post: "Creative Head" },
    { name: "Devansh Ramdurgekar", post: "Design Head" },
    { name: "Ranu Nagar", post: "Photography Head" },
    { name: "Vivek Gaharwar", post: "Photography Head" },
    { name: "Himanshi Mandloi", post: "Information Manager" },
    { name: "Anuj Maheshram", post: "Public Relation Officer" },
    { name: "Mrudul Mehta", post: "Sponsorship Head" },
    { name: "Devansh Porwal", post: "Resource Manager" },
    { name: "Utkarsh Sahu", post: "Resource Manager" },
  ];

  const teamBatch2027 = [
    { name: "Anuja Pathan", post: "Coordinator" },
    { name: "Arpita Jain", post: "Coordinator" },
    { name: "Drashti Dharamsey", post: "Coordinator" },
    { name: "Eklavya Singh Parihar", post: "Coordinator" },
    { name: "Harsh Gharewal", post: "Coordinator" },
    { name: "Harshita Balchandani", post: "Coordinator" },
    { name: "Ibadulla Khilji", post: "Coordinator" },
    { name: "Ishika Ganatra", post: "Coordinator" },
    { name: "Janvi Rathi", post: "Coordinator" },
    { name: "Kavya Jain", post: "Coordinator" },
    { name: "Manas Kolte", post: "Coordinator" },
    { name: "Manish Verma", post: "Coordinator" },
    { name: "Mohit Wadhwani", post: "Coordinator" },
    { name: "Parth Kalra", post: "Coordinator" },
    { name: "Priyanshi Ratnani", post: "Coordinator" },
    { name: "Rajkaran Gour", post: "Coordinator" },
    { name: "Rani Bachani", post: "Coordinator" },
    { name: "Rohit Mandeliya", post: "Coordinator" },
    { name: "Rudransh Namdeo", post: "Coordinator" },
    { name: "Sahil Chauganjkar", post: "Coordinator" },
    { name: "Stuti Bafna", post: "Coordinator" },
    { name: "Vaidansh Suryavanshi", post: "Coordinator" },
    { name: "Vibhuti Baldva", post: "Coordinator" },
    { name: "Aadarsh Bharti", post: "Coordinator" },
    { name: "Adityaraj Panchal", post: "Coordinator" },
    { name: "Ananya Tripathi", post: "Coordinator" },
  ];

  return (
    <>
      
        <div className=' text-start font-bold text-8xl mt-20 m-2 bg-gradient-to-r from-blue-600 to-teal-300 bg-clip-text text-transparent ' >
          Batch 2026
        </div>
        
        <div className='flex justify-center gap-12 flex-wrap'>
        {teamBatch2026.map((member, index) => (
          <TeamCard key={index} name={member.name} post={member.post} />
        ))}
      </div>

      <div className=' text-start font-bold text-8xl mt-20 m-2 bg-gradient-to-r from-blue-600 to-teal-300 bg-clip-text text-transparent ' >
          Batch 2027
        </div>

        <div className='flex justify-center gap-12 flex-wrap'>
        {teamBatch2027.map((member, index) => (
          <TeamCard key={index} name={member.name} post={member.post} />
        ))}
      </div>
        

    </>
  )
}
