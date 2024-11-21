import { classNames } from '@utils/helpers';
import { motion } from 'framer-motion';
type Props = {
  className?: string;
  children: any;
};
const Motion: React.FC<Props> = ({ className, children }) => {
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
      transition={{ duration: 1, delay: 0.1 }}
      viewport={{ once: true }}
      className={classNames('animate-top', className)}
    >
      {children}
    </motion.div>
  );
};
export default Motion;
