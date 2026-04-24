import Header from './Header';
import Footer from './Footer';

export default function About() {
  return (
    <div className="bg-white min-h-screen font-sans text-slate-800">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
              <h1 className="text-4xl font-extrabold text-slate-900 mb-4">About Me</h1>
              <p className="text-xl text-slate-500">Passionate about technology and design.</p>
           </div>
           
           <div className="prose prose-lg prose-slate mx-auto mb-16">
              <p>
                 Hello! I'm a software engineer based in Jakarta, ID. I enjoy creating things that live on the internet. My interest in web development started back in 2012 when I decided to try editing custom Tumblr themes — turns out hacking together HTML & CSS was pretty fun!
              </p>
              <p>
                 Fast-forward to today, and I've had the privilege of working at an advertising agency, a start-up, a huge corporation, and a student-led design studio. My main focus these days is building accessible, inclusive products and digital experiences for a variety of clients.
              </p>
              <p>
                 I also recently launched a course that covers everything you need to build a web app with the Spotify API using Node & React.
              </p>
           </div>
           
           <div className="grid md:grid-cols-2 gap-12">
              <div>
                 <h3 className="text-2xl font-bold text-slate-900 mb-6">Technical Skills</h3>
                 <div className="space-y-4">
                    <div>
                       <div className="flex justify-between mb-1">
                          <span className="font-medium text-slate-700">JavaScript (ES6+)</span>
                          <span className="text-slate-500">90%</span>
                       </div>
                       <div className="w-full bg-slate-200 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '90%' }}></div>
                       </div>
                    </div>
                    <div>
                       <div className="flex justify-between mb-1">
                          <span className="font-medium text-slate-700">React & Next.js</span>
                          <span className="text-slate-500">85%</span>
                       </div>
                       <div className="w-full bg-slate-200 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                       </div>
                    </div>
                    <div>
                       <div className="flex justify-between mb-1">
                          <span className="font-medium text-slate-700">PHP & MySQL</span>
                          <span className="text-slate-500">80%</span>
                       </div>
                       <div className="w-full bg-slate-200 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '80%' }}></div>
                       </div>
                    </div>
                    <div>
                       <div className="flex justify-between mb-1">
                          <span className="font-medium text-slate-700">UI/UX Design</span>
                          <span className="text-slate-500">75%</span>
                       </div>
                       <div className="w-full bg-slate-200 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                       </div>
                    </div>
                 </div>
              </div>
              
              <div>
                 <h3 className="text-2xl font-bold text-slate-900 mb-6">Experience</h3>
                 <div className="space-y-8 border-l-2 border-slate-200 pl-8 relative">
                    <div className="relative">
                       <span className="absolute -left-[39px] top-1 h-5 w-5 rounded-full border-4 border-white bg-blue-600"></span>
                       <h4 className="text-lg font-bold text-slate-900">Senior Frontend Engineer</h4>
                       <p className="text-blue-600 font-medium">Tech Corp • 2023 - Present</p>
                       <p className="text-slate-500 mt-2 text-sm">Leading the frontend team in building scalable web applications.</p>
                    </div>
                    <div className="relative">
                       <span className="absolute -left-[39px] top-1 h-5 w-5 rounded-full border-4 border-white bg-slate-300"></span>
                       <h4 className="text-lg font-bold text-slate-900">Web Developer</h4>
                       <p className="text-blue-600 font-medium">Creative Agency • 2021 - 2023</p>
                       <p className="text-slate-500 mt-2 text-sm">Developed responsive websites for various clients.</p>
                    </div>
                    <div className="relative">
                       <span className="absolute -left-[39px] top-1 h-5 w-5 rounded-full border-4 border-white bg-slate-300"></span>
                       <h4 className="text-lg font-bold text-slate-900">Junior Designer</h4>
                       <p className="text-blue-600 font-medium">Design Studio • 2020 - 2021</p>
                       <p className="text-slate-500 mt-2 text-sm">Assisted in UI design and prototyping.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
