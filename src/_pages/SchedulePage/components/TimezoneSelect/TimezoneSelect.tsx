import { Select } from "@radix-ui/themes";
import { FC } from "react";

export type TimezoneSelectProps = {
  value?: string;
  onValueChange: (value: string) => void;
};

export const TimezoneSelect: FC<TimezoneSelectProps> = ({
  value = "America/New_York",
  onValueChange,
}) => {
  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger />
      <Select.Content>
        <Select.Item value="America/New_York">America/New_York</Select.Item>
        <Select.Item value="America/Los_Angeles">
          America/Los_Angeles
        </Select.Item>
        <Select.Item value="Asia/Seoul">Asia/Seoul</Select.Item>
      </Select.Content>
    </Select.Root>
  );
};
