import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Heart, Users, Award } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Leaf,
      title: "Natural & Pure",
      description: "We source only the finest organic teas and spices from trusted Nigerian farmers, ensuring purity and potency in every product."
    },
    {
      icon: Heart,
      title: "Health First",
      description: "Every tea blend and spice selection is carefully crafted with your wellness and culinary needs in mind, combining traditional wisdom with modern quality standards."
    },
    {
      icon: Users,
      title: "Community Focused",
      description: "We support local communities and farmers, creating sustainable partnerships that benefit everyone."
    },
    {
      icon: Award,
      title: "Quality Excellence",
      description: "Our rigorous quality standards ensure that every cup delivers the exceptional taste and benefits you deserve."
    }
  ];

  const team = [
    {
      name: "Sue Adebayo",
      role: "Co-Founder & CEO",
      bio: "A passionate herbalist with 15 years of experience in traditional Nigerian medicine."
    },
    {
      name: "Monica Okafor", 
      role: "Co-Founder & Head of Product",
      bio: "Former pharmaceutical researcher turned tea enthusiast, dedicated to creating healing blends."
    },
    {
      name: "Dr. Emeka Nwosu",
      role: "Chief Wellness Officer",
      bio: "Licensed naturopathic doctor specializing in herbal medicine and holistic health."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-6">About Sue&Mon</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Founded by two passionate women, Sue and Monica, Sue&Mon was born from a shared vision to bring the healing power of Nigerian tea and spice traditions to modern wellness seekers and culinary enthusiasts. We believe that nature provides the best ingredients for health, healing, and exceptional cooking.
            </p>
          </div>

          {/* Story Section */}
          <div className="bg-gradient-subtle rounded-2xl p-8 mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Our Story</h2>
              <div className="space-y-6 text-muted-foreground">
                <p>
                  Sue&Mon began in 2019 when childhood friends Sue and Monica reunited over a cup of hibiscus tea and a meal seasoned with fresh Nigerian spices. Both had experienced the transformative power of traditional Nigerian herbs and spices in their health and culinary journeys, realizing these treasures deserved a place in modern wellness and cooking.
                </p>
                <p>
                  What started as weekend experiments in Monica's kitchen quickly grew into a passion project. We spent months traveling across Nigeria, learning from traditional healers and local cooks, meeting farmers, and understanding the rich heritage of our medicinal plants and culinary spices.
                </p>
                <p>
                  Today, Sue&Mon is proud to offer premium tea blends and authentic spices that honor our cultural heritage while meeting the highest standards of quality and purity. Every product tells a story of tradition, wellness, flavor, and the beautiful land we call home.
                </p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-elegant transition-all duration-300">
                    <CardHeader>
                      <div className="bg-gradient-hero p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <IconComponent className="h-8 w-8 text-primary-foreground" />
                      </div>
                      <CardTitle className="text-lg">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {value.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Team */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-elegant transition-all duration-300">
                  <CardHeader>
                    <div className="w-24 h-24 bg-gradient-hero rounded-full mx-auto mb-4"></div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <CardDescription className="font-semibold text-primary">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;