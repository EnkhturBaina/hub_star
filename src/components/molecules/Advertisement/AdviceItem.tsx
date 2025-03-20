import { Advice } from '@typeDefs/reference';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  useDisclosure,
  ModalBody,
} from '@heroui/react';
type Props = {
  advice: Advice;
};
const AdviceItem: React.FC<Props> = ({ advice }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: -20,
        },

        visible: {
          opacity: 1,
          y: 0,
        },
      }}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 1, delay: 0.5 }}
      viewport={{ once: true }}
      className="animate_top rounded-lg overflow-hidden bg-white shadow-md"
    >
      <Button
        onPress={onOpen}
        className="relative h-56 w-full bg-[#DADADA] flex flex-col justify-center items-center"
      >
        <Image
          src="/pdf_icon.png"
          alt={advice.title}
          width={54}
          height={70}
          className="h-24 w-20"
        />
      </Button>

      <h3 className="!mb-1 !mt-2 line-clamp-2 inline-block text-base font-bold text-center text-[#909294] duration-300 px-6 pb-2">
        {advice.title}
      </h3>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        size="5xl"
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: 'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
          base: 'my-auto',
        }}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">{advice.title}</ModalHeader>
              <ModalBody
                style={{
                  width: '100%',
                  marginBottom: '56.25%',
                  position: 'relative',
                }}
              >
                <iframe
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '500px',
                  }}
                  src={process.env.NEXT_PUBLIC_MEDIA_URL + advice.pdfId + '#toolbar=0'}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Хаах
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </motion.div>
  );
};

export default AdviceItem;
