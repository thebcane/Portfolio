"use client";

import { Card, CardContent } from "@/components/ui/card";
import { resumeData } from "@/lib/data/resume";
import { GraduationCap, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { HeroImage } from "@/components/hero-image";

export function ResumeSection() {
  return (
    <div className="space-y-12">
      {/* Hero Image */}
      <HeroImage
        src="/images/Banners/Brendan_Banner_1.png"
        alt="Resume"
        title="Resume"
        subtitle="My education, experience, and skills"
        size="small"
        objectPosition="center 30%"
      />

      {/* Experience */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <Briefcase className="w-8 h-8 text-accent" />
          <h2 className="text-3xl font-bold">Experience</h2>
        </div>

        <div className="space-y-6 relative before:absolute before:left-[11px] before:top-[12px] before:bottom-[12px] before:w-[2px] before:bg-border">
          {resumeData.experience.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-10"
            >
              <div className="absolute left-0 top-2 w-6 h-6 rounded-full bg-gradient-to-br from-accent to-accent/50 border-4 border-background" />
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-accent mb-3">{item.period}</p>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <GraduationCap className="w-8 h-8 text-accent" />
          <h2 className="text-3xl font-bold">Education</h2>
        </div>

        <div className="space-y-6 relative before:absolute before:left-[11px] before:top-[12px] before:bottom-[12px] before:w-[2px] before:bg-border">
          {resumeData.education.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="relative pl-10"
            >
              <div className="absolute left-0 top-2 w-6 h-6 rounded-full bg-gradient-to-br from-accent to-accent/50 border-4 border-background" />
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-accent mb-3">{item.period}</p>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* My Skills */}
      <section>
        <h2 className="text-3xl font-bold mb-8">My Skills</h2>
        <div className="space-y-6">
          {resumeData.skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">{skill.name}</h3>
                <span className="text-sm text-accent font-semibold">{skill.level}%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-accent to-accent/70 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.7, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
