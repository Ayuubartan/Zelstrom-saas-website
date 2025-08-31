import Image from "next/image";

type Props = {
  src: string;
  alt?: string;      // ← required by a11y rule; default below
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
};

export default function LogoImage({ alt = "", ...props }: Props) {
  return <Image alt={alt} {...props} />;
}
