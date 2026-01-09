import { type PortableTextProps, PortableText } from "@portabletext/react";

export default function RichText({ components, ...rest }: PortableTextProps) {
  return <PortableText {...rest} />;
}