import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProjectBySlug, getProfile } from "@/lib/data";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const [project, profile] = await Promise.all([
    getProjectBySlug(slug),
    getProfile(),
  ]);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Navbar logo={profile.logo || profile.name.split(" ").map(n => n[0]).join("")} />
      <main className="min-h-screen pt-20">
        <article className="section-padding">
          <div className="container-custom">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-secondary hover:text-accent transition-colors duration-300 mb-8 cursor-pointer"
            >
              <ArrowLeft size={18} />
              Back to Projects
            </Link>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="relative h-56 sm:h-72 md:h-96 lg:h-[500px] rounded-xl overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">
                  {project.title}
                </h1>

                <div className="flex items-center gap-2 text-secondary mb-6">
                  <Calendar size={16} />
                  <span className="text-sm">{project.createdAt}</span>
                </div>

                <p className="text-secondary text-lg leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm px-4 py-2 bg-surface border border-border rounded-full text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-accent text-background px-6 py-3 rounded-lg font-medium hover:bg-accent-hover transition-all duration-300 hover:scale-105"
                  >
                    <ExternalLink size={18} />
                    View Live Project
                  </a>
                )}
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer profile={profile} />
    </>
  );
}