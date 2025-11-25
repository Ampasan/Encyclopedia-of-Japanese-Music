import styles from "./PaymentSuccessModal.module.css";

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  concertName: string;
}

const PaymentSuccessModal = ({
  isOpen,
  onClose,
  concertName,
}: PaymentSuccessModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.content}>
          <div className={styles.icon}>✓</div>
          <h2 className={styles.title}>Payment Successful!</h2>
          <p className={styles.message}>
            Your ticket for <strong>{concertName}</strong> has been purchased
            successfully.
          </p>
          <p className={styles.subMessage}>
            You will receive a confirmation email shortly with your ticket
            details.
          </p>
          <button onClick={onClose} className={styles.closeBtn}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessModal;
