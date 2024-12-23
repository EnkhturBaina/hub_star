import { BudgetIcon } from '@components/common/icons';
import { Card } from 'antd';
import React from 'react';
import styles from './special-card.module.scss';
const SpecialCard: React.FC = () => {
  return <Card hoverable style={{ width: 140 }} cover={<BudgetIcon />}></Card>;
};
export default SpecialCard;
