import { Mail, Linkedin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const teamMembers = [
  {
    name: "Vikash Gupta",
    email: "vikash@example.com",
    linkedin: "https://linkedin.com/in/vikashgupta"
  },
  {
    name: "Krishna Singh",
    email: "krishna@example.com",
    linkedin: "https://linkedin.com/in/krishnasingh"
  },
  {
    name: "Aman Chaurasia",
    email: "aman@example.com",
    linkedin: "https://linkedin.com/in/amanchaurasia"
  }
];

export const TeamSection = () => {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Our Team</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {teamMembers.map((member) => (
            <Card key={member.name} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-foreground">{member.name}</h3>
                <div className="flex gap-4">
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                    aria-label={`Email ${member.name}`}
                  >
                    <Mail className="w-5 h-5" />
                    <span className="text-sm">Email</span>
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                    aria-label={`LinkedIn profile of ${member.name}`}
                  >
                    <Linkedin className="w-5 h-5" />
                    <span className="text-sm">LinkedIn</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
