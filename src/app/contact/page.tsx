import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "./ContactForm";
import { getProfile } from "@/lib/data";

export default async function ContactPage() {
  const profile = await getProfile();

  return (
    <>
      <Navbar logo={profile.logo || profile.name.split(" ").map(n => n[0]).join("")} />
      <ContactForm />
      <Footer profile={profile} />
    </>
  );
}
