-- Create blog posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  image_url TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create page content table for dynamic pages
CREATE TABLE public.page_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}',
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;

-- Blog posts policies
CREATE POLICY "Anyone can view published blog posts" 
ON public.blog_posts 
FOR SELECT 
USING (published = true);

CREATE POLICY "Admins can manage all blog posts" 
ON public.blog_posts 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Page content policies
CREATE POLICY "Anyone can view published page content" 
ON public.page_content 
FOR SELECT 
USING (published = true);

CREATE POLICY "Admins can manage all page content" 
ON public.page_content 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add triggers for updated_at
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_page_content_updated_at
BEFORE UPDATE ON public.page_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default page content
INSERT INTO public.page_content (page_slug, title, content) VALUES
('story', 'Our Story', '{"hero": {"title": "Our Story", "subtitle": "Learn about Sue&Mon''s journey"}, "content": "Sue&Mon was born from a passion for natural wellness and the rich heritage of herbal remedies..."}'),
('faq', 'Frequently Asked Questions', '{"hero": {"title": "FAQ", "subtitle": "Find answers to common questions"}, "faqs": [{"question": "What makes your teas special?", "answer": "Our teas are carefully sourced and blended for maximum health benefits."}, {"question": "How should I store my tea?", "answer": "Store in a cool, dry place away from direct sunlight."}]}'),
('benefits', 'Health Benefits', '{"hero": {"title": "Health Benefits", "subtitle": "Discover the power of natural wellness"}, "content": "Our herbal teas and spices offer numerous health benefits backed by traditional wisdom and modern research..."}');

-- Insert sample blog posts
INSERT INTO public.blog_posts (title, excerpt, content, author, category, published) VALUES
('The Power of Ginger Tea', 'Discover the amazing health benefits of ginger tea for digestion and immunity.', 'Ginger tea has been used for centuries as a natural remedy for various ailments. Rich in antioxidants and anti-inflammatory compounds, it can help with digestion, nausea, and boosting immunity. Learn how to prepare the perfect cup and maximize its benefits.', 'Sue&Mon Team', 'immunity', true),
('Turmeric: The Golden Spice', 'Explore why turmeric is considered one of the most powerful anti-inflammatory spices.', 'Turmeric contains curcumin, a compound with powerful anti-inflammatory and antioxidant properties. This golden spice has been used in traditional medicine for thousands of years and modern research continues to validate its health benefits.', 'Sue&Mon Team', 'wellness', true),
('Creating Your Evening Tea Ritual', 'Learn how to wind down with the perfect bedtime tea blend.', 'An evening tea ritual can help signal to your body that it''s time to relax and prepare for sleep. Discover the best herbs for relaxation and how to create a calming bedtime routine with our sleep-promoting tea blends.', 'Sue&Mon Team', 'sleep', true);