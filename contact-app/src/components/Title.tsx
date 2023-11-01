import { Text } from "@nextui-org/react";

export default function Title() {
  return (
    <Text
      h1
      className="py-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
      css={{
        textGradient: "45deg, $purple600 -20%, $pink600 100%",
      }}
      weight="bold"
    >
      Contacts Dashboard
    </Text>
  );
}
