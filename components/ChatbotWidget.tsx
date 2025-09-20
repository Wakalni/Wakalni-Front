"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, MessageCircle } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Bonjour 👋! Je suis votre assistant virtuel.",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");

  const fakeResponses = [
    "Je comprends, pouvez-vous préciser ?",
    "Intéressant !",
    "Je vais réfléchir à ça...",
    "Bonne question !",
    "Je ne suis pas sûr, mais je crois que oui.",
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const newMsg: Message = {
      id: Date.now(),
      text: input,
      sender: "user",
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now() + 1,
        text: fakeResponses[Math.floor(Math.random() * fakeResponses.length)],
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Bouton flottant */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <Button
              size="icon"
              className="rounded-full h-14 w-14 shadow-lg"
              onClick={() => setOpen(true)}
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fenêtre du chatbot */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="w-80"
          >
            <Card className="shadow-xl rounded-2xl overflow-hidden flex flex-col h-96">
              <CardHeader className="flex justify-between items-center bg-primary text-primary-foreground">
                <CardTitle className="text-lg">Assistant Virtuel</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white"
                  onClick={() => setOpen(false)}
                >
                  ✕
                </Button>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto space-y-2 p-3 bg-muted">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-2 rounded-lg max-w-[80%] text-orange-600 ${
                      msg.sender === "user"
                        ? "ml-auto bg-primary"
                        : "bg-white border"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </CardContent>
              <div className="flex items-center gap-2 p-3 border-t">
                <Input
                  placeholder="Écrivez un message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <Button size="icon" onClick={handleSend}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
