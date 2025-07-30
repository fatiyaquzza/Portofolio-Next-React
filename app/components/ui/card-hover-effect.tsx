import { cn } from "@/app/components/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    link: string;
    image: string;
    tools?: string;
    type: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          href={item?.link}
          key={item?.link}
          className="relative group block p-2 h-full w-full "
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full  dark:bg-slate-800/[0.8] block rounded-3xl bg-[#2B0780]"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card
            title={item.title}
            image={item.image}
            tools={item.tools}
            link={item.link}
            isHovered={hoveredIndex === idx}
            type={item.type}
          >
            <CardTitle>{item.title}</CardTitle>

            {item.tools && (
              <p className=" text-[#6184DC] text-sm">{item.tools}</p>
            )}
          </Card>
        </a>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
  title,
  image,
  tools,
  link,
  isHovered,
  type,
}: {
  className?: string;
  children: React.ReactNode;
  title: string;
  image: string;
  tools?: string;
  link: string;
  isHovered: boolean;
  type: string;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-6 bg-[#0D0D0D] border border-white/10 shadow-xl relative z-20 transition duration-300 ease-in-out group-hover:scale-[1.01]",
        className
      )}
    >
      <img
        src={image}
        alt={title}
        className={cn(
          "w-full h-60 object-cover rounded-xl transition-opacity duration-300",
          isHovered ? "opacity-50" : "opacity-100"
        )}
      />

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl"
          >
            <p className="text-white text-2xl font-bold mb-2">{type}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-50">{children}</div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-white font-semibold text-lg mt-6 mb-1", className)}>
      {children}
    </h4>
  );
};
