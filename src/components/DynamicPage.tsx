import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";

interface PageContent {
  id: string;
  page_slug: string;
  title: string;
  content: any;
  published: boolean;
}

interface DynamicPageProps {
  pageSlug?: string; // For direct page specification
}

const DynamicPage = ({ pageSlug }: DynamicPageProps) => {
  const { slug } = useParams();
  const [content, setContent] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentSlug = pageSlug || slug;

  useEffect(() => {
    const fetchPageContent = async () => {
      if (!currentSlug) {
        setError("Page not found");
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('page_content')
          .select('*')
          .eq('page_slug', currentSlug)
          .eq('published', true)
          .single();

        if (error) {
          console.error('Error fetching page content:', error);
          setError("Page not found");
        } else {
          setContent(data);
        }
      } catch (err) {
        console.error('Error:', err);
        setError("Failed to load page content");
      } finally {
        setLoading(false);
      }
    };

    fetchPageContent();
  }, [currentSlug]);

  const renderContent = (contentData: any) => {
    if (!contentData) return null;

    // Handle different content types
    if (typeof contentData === 'string') {
      return <div dangerouslySetInnerHTML={{ __html: contentData }} />;
    }

    // Handle structured content
    if (contentData.sections) {
      return (
        <div className="space-y-8">
          {contentData.sections.map((section: any, index: number) => (
            <Card key={index}>
              <CardContent className="p-8">
                {section.title && (
                  <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                )}
                {section.content && (
                  <div className="text-muted-foreground prose max-w-none">
                    {typeof section.content === 'string' ? (
                      <div dangerouslySetInnerHTML={{ __html: section.content }} />
                    ) : (
                      <p>{section.content}</p>
                    )}
                  </div>
                )}
                {section.items && (
                  <ul className="space-y-2 mt-4">
                    {section.items.map((item: string, itemIndex: number) => (
                      <li key={itemIndex} className="text-muted-foreground">• {item}</li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    // Handle simple HTML content
    if (contentData.html) {
      return <div dangerouslySetInnerHTML={{ __html: contentData.html }} />;
    }

    // Handle plain text
    return (
      <Card>
        <CardContent className="p-8">
          <div className="text-muted-foreground prose max-w-none">
            <p>{JSON.stringify(contentData, null, 2)}</p>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="animate-pulse">
                <div className="h-8 bg-muted rounded w-1/3 mx-auto mb-4"></div>
                <div className="h-4 bg-muted rounded w-2/3 mx-auto"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-foreground mb-4">Page Not Found</h1>
              <p className="text-muted-foreground">
                {error || "The page you're looking for doesn't exist or is not published."}
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-foreground mb-4">{content.title}</h1>
          </div>
          
          {renderContent(content.content)}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DynamicPage;