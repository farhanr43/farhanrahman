import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectsList from "@/components/ProjectsList";
import { getProjects, getProfile, getAllTags } from "@/lib/data";

export default function ProjectsPage() {
  const projects = getProjects();
  const tags = getAllTags();
  const profile = getProfile();

  return (
    <>
      <Navbar logo={profile.logo || profile.name.split(" ").map(n => n[0]).join("")} />
      <ProjectsList projects={projects} tags={tags} />
      <Footer profile={profile} />
    </>
  );
}