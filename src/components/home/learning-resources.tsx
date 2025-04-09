import Link from "next/link";
import { BookOpen, File, FileText, Video } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function LearningResources() {
  const resources = [
    {
      title: "Options 101",
      description: "Learn the basics of Bitcoin options trading",
      icon: <BookOpen className="h-5 w-5 text-blue-500" />,
      href: "/learn/options-101",
    },
    {
      title: "Hedging Strategies",
      description: "Protect your BTC holdings with options",
      icon: <FileText className="h-5 w-5 text-green-500" />,
      href: "/learn/hedging",
    },
    {
      title: "Trading Tutorials",
      description: "Step-by-step videos on options trading",
      icon: <Video className="h-5 w-5 text-purple-500" />,
      href: "/learn/tutorials",
    },
    {
      title: "FAQ & Documentation",
      description: "Common questions and detailed guides",
      icon: <File className="h-5 w-5 text-orange-500" />,
      href: "/learn/faq",
    },
  ];

  return (
    <Card className="shadow-sm h-full">
      <CardHeader className="pb-2 border-b px-6">
        <CardTitle className="text-xl font-bold">Learning Resources</CardTitle>
        <CardDescription>Educational materials to help you get started</CardDescription>
      </CardHeader>
      <CardContent className="pt-4 px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {resources.map((resource, index) => (
            <Link 
              key={index} 
              href={resource.href}
              className="block group"
            >
              <div className="border rounded-lg p-4 transition-all hover:border-blue-200 hover:bg-blue-50/30 h-full">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-1.5 rounded-md bg-slate-100 group-hover:bg-white">
                    {resource.icon}
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{resource.title}</h3>
                    <p className="text-sm text-slate-500">{resource.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link 
            href="/learn" 
            className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
          >
            Browse All Learning Materials
          </Link>
        </div>
      </CardContent>
    </Card>
  );
} 