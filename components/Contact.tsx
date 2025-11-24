import { Github, Linkedin, Mail, FileDown } from "lucide-react";
import { ChatAssistant } from "./features/ChatAssistant";
import { MangaCard } from "./ui/MangaCard";
import { PERSONAL_INFO } from "@/lib/personal_data";

export default function Contact() {
    return (
            <section id="contact" className="h-screen w-full snap-start relative flex flex-col bg-transparent border-t-4 border-cyan-400 overflow-hidden tech-grid">
               <div className="flex-1 overflow-y-auto pt-24 pb-4 px-4 w-full">
                <div className="max-w-5xl mx-auto w-full h-full flex flex-col relative z-10">
                  <div className="text-center mb-8 flex-shrink-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl relative z-10">
                    <h2 className="font-display text-5xl text-slate-900 dark:text-white mb-4">COMMUNICATION CHANNEL</h2>
                    <p className="text-xl text-cyan-600 dark:text-cyan-400 font-tech">Establish link via traditional forms or chat with my AI.</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-grow relative z-10">
                     {/* Social Links Panel */}
                     <div className="lg:col-span-1 space-y-4">
                       <MangaCard variant="danger" title="DIRECT LINK">
                         <div className="flex flex-col gap-4">
                           <a href={PERSONAL_INFO.github} target="_blank" className="flex items-center gap-4 p-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border-2 border-slate-300 dark:border-slate-600 group">
                             <Github size={32} className="text-slate-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-500" />
                             <span className="font-mono text-sm text-slate-700 dark:text-slate-300">GITHUB</span>
                           </a>
                           <a href={PERSONAL_INFO.linkedin} target="_blank" className="flex items-center gap-4 p-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border-2 border-slate-300 dark:border-slate-600 group">
                             <Linkedin size={32} className="text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400" />
                             <span className="font-mono text-sm text-slate-700 dark:text-slate-300">LINKEDIN</span>
                           </a>
                           <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-4 p-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border-2 border-slate-300 dark:border-slate-600 group">
                             <Mail size={32} className="text-slate-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400" />
                             <span className="font-mono text-sm text-slate-700 dark:text-slate-300">EMAIL</span>
                           </a>
                           <a href="/resume.pdf"  target="_blank" className="flex items-center gap-4 p-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border-2 border-slate-300 dark:border-slate-600 group">
                             <FileDown size={32} className="text-slate-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400" />
                             <span className="font-mono text-sm text-slate-700 dark:text-slate-300">RESUME</span>
                           </a>
                         </div>
                       </MangaCard>
                     </div>

                     {/* Chatbot */}
                     <div className="lg:col-span-2 pb-8">
                       <ChatAssistant />
                     </div>
                  </div>
                  
                  <footer className="text-center py-4 flex-shrink-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-t-lg mt-4 relative z-10">
                    <p className="font-mono text-slate-500 dark:text-gray-500 text-sm">
                      © {new Date().getFullYear()} Yukuan Hao. POWERED BY REACT & GEMINI AI.
                    </p>
                  </footer>
                </div>
              </div>
            </section>
    );
}