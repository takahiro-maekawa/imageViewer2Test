import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import ColoredLabaleButton from '@/components/atom/coloredLabelButton';
import "@/app/globals.css"; // Importできます

const meta = {
  title: 'Example/ColoredLabaleButton',
  component: ColoredLabaleButton,
} satisfies Meta<typeof ColoredLabaleButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
  },
};