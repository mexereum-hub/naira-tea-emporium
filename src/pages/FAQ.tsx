import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What makes Sue&Mon teas and spices special?",
      answer: "Our products are sourced directly from trusted Nigerian farmers and prepared using traditional methods. Each blend is carefully selected for its therapeutic properties and undergoes rigorous quality testing to ensure maximum freshness and potency."
    },
    {
      question: "How should I store my teas and spices?",
      answer: "Store your teas and spices in a cool, dry place away from direct sunlight. Keep them in airtight containers to maintain freshness and potency. Properly stored, our products maintain their quality for up to 2 years."
    },
    {
      question: "Are your products organic?",
      answer: "Many of our products are organically grown, though not all carry formal certification. We work directly with farmers who use sustainable, chemical-free growing practices. Check individual product descriptions for specific organic certifications."
    },
    {
      question: "How do I prepare the teas for maximum benefits?",
      answer: "For most herbal teas, use 1-2 teaspoons per cup of hot water (not boiling - around 85°C). Steep for 5-7 minutes for optimal flavor and nutrient extraction. Follow specific brewing instructions included with each product."
    },
    {
      question: "Can I take these teas if I'm on medication?",
      answer: "While our products are natural, some herbs can interact with medications. We recommend consulting with your healthcare provider before adding any new herbal supplements to your routine, especially if you're taking prescription medications."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Currently, we primarily serve customers within Nigeria. We're working on expanding our shipping options internationally. Please contact us for specific international shipping inquiries."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for unopened products in original packaging. If you're not satisfied with your purchase, please contact our customer service team within 30 days of delivery for a full refund or exchange."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard delivery within Lagos takes 1-2 business days. Other Nigerian cities typically receive orders within 3-5 business days. Express shipping options are available for faster delivery."
    },
    {
      question: "Are there any side effects?",
      answer: "Our products are generally safe for most people when used as directed. However, some individuals may be sensitive to certain herbs. Start with smaller amounts to test your tolerance and discontinue use if you experience any adverse reactions."
    },
    {
      question: "Can pregnant or nursing women use your products?",
      answer: "Some herbal teas may not be suitable during pregnancy or breastfeeding. We strongly recommend consulting with your healthcare provider before using any herbal products during pregnancy, nursing, or if you're trying to conceive."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our teas, spices, and services.
            </p>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-medium hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;