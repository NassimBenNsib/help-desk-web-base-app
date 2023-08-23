"use client";

// import "aos/dist/aos.css";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AOS from "aos";
import { useEffect } from "react";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shifti Help Desk",
  description: `The Shifti Help Desk is a comprehensive customer support system designed to provide efficient and effective assistance to our valued customers. Powered by cutting-edge technology, it offers a user-friendly interface and a range of features to address and resolve customer queries, issues, and concerns promptly.
  Key Features:
  - Ticket Management: Customers can easily raise support tickets, providing detailed information about their inquiries or problems.
  - Knowledge Base: Access a vast repository of articles, FAQs, and guides to help customers find instant answers to common questions.
  - Live Chat: Engage in real-time conversations with our dedicated support agents who are available to provide immediate assistance.
  - Ticket Tracking: Customers can monitor the progress of their support tickets, ensuring transparency and peace of mind.
  - Self-Service Options: Empowering customers to resolve minor issues independently through self-help resources and tutorials.
  - Escalation Mechanism: Promptly escalate critical issues to specialized teams for swift resolution.
  - Analytics and Reporting: Gain valuable insights into customer support performance and identify areas for improvement.
  
  With the Shifti Help Desk, our goal is to deliver exceptional customer experiences, streamline support processes, and ensure that every customer receives the assistance they need in a timely manner. We are committed to providing the highest level of service and support to our valued customers.`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }, []);
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
        {children}
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
