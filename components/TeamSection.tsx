'use client';

import Image from 'next/image';

export default function TeamSection() {
  const team = [
    {
      name: 'Suraj Kumar',
      role: 'Full-Stack Developer',
      intro: 'I am currently pursuing my B.Tech in Computer Science at Brainware University. Passionate about AI/ML & Web Development.',
      img: '/images/team/suraj.jpeg',
      linkedin: 'https://www.linkedin.com/in/suraj-kumar-6a2759283/',
      github: 'https://github.com/vishsuraj9546',
      phone: '9546860925'
    },
    {
      name: 'Abhishek Anand',
      role: 'Graphic Designer & Video Editor',
      intro: 'Graduate from MAAC Academy. Specializes in motion graphics, video editing & creative visual storytelling.',
      img: '/images/team/abhishek.png',
      instagram: 'https://www.instagram.com/abhishek_designs',
      phone: '8578093008'
    },
    {
      name: 'Rahul Raj',
      role: 'Frontend Developer',
      intro: 'Trained at MAAC Academy. Skilled in frontend design, UI/UX, and interactive web experiences.',
      img: '/images/team/rahul.png',
      email: 'rahulraj@email.com',
      phone: '7667299920'
    }
  ];

  return (
    <section className="py-20 bg-black text-white relative">
      {/* Background glow effects */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-purple-900/20 to-transparent" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-pink-900/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 🔹 Section Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Meet Our <span className="text-purple-400">Team</span>
        </h2>

        {/* 🔹 Team Member Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {team.map((member, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-b from-zinc-800 to-black rounded-2xl p-6 shadow-lg hover:shadow-purple-500/30 transition-all duration-500 hover:-translate-y-2"
            >
              {/* ✅ Profile Image */}
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-5 border-4 border-purple-500/30 shadow-md">
                <Image
                  src={member.img}
                  alt={member.name}
                  width={128}
                  height={128}
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* ✅ Name & Role */}
              <h3 className="text-2xl font-bold text-center">{member.name}</h3>
              <p className="text-purple-400 text-sm text-center">{member.role}</p>

              {/* ✅ Intro */}
              <p className="text-gray-300 text-center mt-3 text-sm leading-relaxed">
                {member.intro}
              </p>

              {/* ✅ Contact Links */}
              <div className="flex items-center justify-center gap-4 mt-5">
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 text-2xl transition">
                    <i className="ri-linkedin-fill"></i>
                  </a>
                )}
                {member.github && (
                  <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 text-2xl transition">
                    <i className="ri-github-fill"></i>
                  </a>
                )}
                {member.instagram && (
                  <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-400 text-2xl transition">
                    <i className="ri-instagram-fill"></i>
                  </a>
                )}
                {member.email && (
                  <a href={`mailto:${member.email}`} className="text-gray-400 hover:text-blue-400 text-2xl transition">
                    <i className="ri-mail-fill"></i>
                  </a>
                )}
                {member.phone && (
                  <a href={`tel:${member.phone}`} className="text-gray-400 hover:text-green-400 text-2xl transition">
                    <i className="ri-phone-fill"></i>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Join Our Team Button */}
        <div className="mt-14 flex justify-center">
          {/* <a
            href="alphadigital9546@gmail.com "
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300"
          >
            🚀 Join Our Team
          </a> */}

<a
  href="/careers"   // ✅ email ke jagah page link karega
  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300"
>
  🚀 Join Our Team
</a>


        </div>
      </div>
    </section>
  );
}
