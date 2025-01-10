import {
  Image,
  Modal,
  ModalBody,
  ModalContent,
} from "@nextui-org/react";
import { FC } from "react";

interface Props {
  imagen?: string;
  isOpen: boolean;
  onClose: () => void;
}

const ImagePreview: FC<Props> = ({ isOpen, onClose, imagen }) => {

  return (
    <>
      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose} size="3xl" placement="center" hideCloseButton>
        <ModalContent>
          {() => (
            <>
              <ModalBody className="py-5">
                <Image src={imagen} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImagePreview;
