import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { getProfile, getFeaturedProjects, getSkills, getSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export default function Home() {
  const profile = getProfile();
  const projects = getFeaturedProjects();
  const skills = getSkills();
  const settings = getSettings();

  return (
    <>
      <Navbar logo={profile.logo || profile.name.split(" ").map(n => n[0]).join("")} />
      <main>
        {settings.showSectionHero && (
          <Hero profile={profile} settings={settings} />
        )}

        {settings.showSectionAbout && (
          <About profile={profile} settings={settings} />
        )}

        {settings.showSectionProjects && (
          <section className="section-padding">
            <div className="container-custom">
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-semibold mb-4">
                  {settings.projectsSectionTitle}
                </span>
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">
                  {settings.projectsSectionTitle}
                </h2>
                <p className="text-secondary text-lg max-w-xl mx-auto">
                  {settings.projectsSectionSubtitle}
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </div>
            </div>
          </section>
        )}

        {settings.showSectionSkills && (
          <Skills skills={skills} settings={settings} />
        )}

        {settings.showSectionContact && (
          <Contact profile={profile} settings={settings} />
        )}
      </main>
      <Footer profile={profile} settings={settings} />
    </>
  );
}