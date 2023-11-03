import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

function App() {
  const items = [
    {
      id: 1,
      trigger: "Is is accessible?",
      content: "Yes. It adheres to the WAI-ARIA design pattern.",
    },
    {
      id: 2,
      trigger: "Is it styled?",
      content: `Yes. It comes with default styles that matches the other
      components aesthetic.`,
    },
    {
      id: 3,
      trigger: "Is it animated?",
      content: `Yes. It's animated by default, but you can disable it if you
      prefer.`,
    },
  ];

  return (
    <div className="mx-48">
      <p>BOUBA CHIKOUR</p>
      <div>
        <Accordion type="single" collapsible className="w-full">
          {items.map((item) => {
            return (
              <AccordionItem key={item.id} value={`item-${item.id}`}>
                <AccordionTrigger> {item.trigger} </AccordionTrigger>
                <AccordionContent>
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="airplane-mode" />
        <Label htmlFor="airplane-mode">Airplane Mode</Label>
      </div>
    </div>
  );
}

export default App;
