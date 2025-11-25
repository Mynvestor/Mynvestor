import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';

export type FAQItem = {
  question: string;
  answer: string;
};

export type FAQAccordionProps = {
  items?: FAQItem[];
};

export default function FAQAccordion({
  items = [
    {
      question: 'How do I open an account?',
      answer: 'To open an account, click Sign Up and follow the guided steps to verify your identity and link a payment method.',
    },
    {
      question: 'What are the fees?',
      answer: 'We aim to keep fees low — check the Fees page in Settings for up-to-date commission and transfer charges.',
    },
    {
      question: 'How long do deposits take?',
      answer: 'Mobile-money deposits are typically instant. Bank transfers can take 1-3 business days depending on your bank.',
    },
  ],
}: FAQAccordionProps) {
  return (
    <Box>
      {items.map((item, idx) => (
        <Accordion key={idx} sx={{ mb: 1 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 600 }}>{item.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
