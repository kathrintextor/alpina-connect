import { statusLabels } from '../data/mockData';
import './StatusBadge.css';

export default function StatusBadge({ status }) {
  return (
    <span className={`status-badge status-${status}`}>
      {statusLabels[status] || status}
    </span>
  );
}
