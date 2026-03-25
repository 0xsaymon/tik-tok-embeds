import { useForm } from '@tanstack/react-form';
import { Redo2, Undo2 } from 'lucide-react';
import { useCallback } from 'react';

import Ai2Icon from '@/shared/assets/icons/ai-2.svg?react';
import Ai3Icon from '@/shared/assets/icons/ai-3.svg?react';
import { Button } from '@/shared/ui-kit/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/shared/ui-kit/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupTextarea,
} from '@/shared/ui-kit/components/ui/input-group';
import { Typography } from '@/shared/ui-kit/components/ui/typography';
import { cn } from '@/shared/ui-kit/lib/utils';

import { backgroundGeneratorValidationSchema } from '../model/background-generator.schema';
import { useBackgroundGeneratorStore } from '../model/background-generator.store';

export function BackgroundGeneratorForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'form'>) {
  const storePrompt = useBackgroundGeneratorStore(state => state.prompt);
  const isGenerating = useBackgroundGeneratorStore(state => state.isGenerating);
  const canUndo = useBackgroundGeneratorStore(state => state.canUndo);
  const canRedo = useBackgroundGeneratorStore(state => state.canRedo);
  const setPrompt = useBackgroundGeneratorStore(state => state.setPrompt);
  const generateBackground = useBackgroundGeneratorStore(state => state.generateBackground);
  const regeneratePrompt = useBackgroundGeneratorStore(state => state.regeneratePrompt);
  const undo = useBackgroundGeneratorStore(state => state.undo);
  const redo = useBackgroundGeneratorStore(state => state.redo);

  const form = useForm({
    defaultValues: { prompt: storePrompt },
    validators: { onSubmit: backgroundGeneratorValidationSchema },
    onSubmit: async ({ value }) => {
      generateBackground(value.prompt);
    },
  });

  const handleSubmit = useCallback(
    (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();
      form.handleSubmit();
    },
    [form],
  );

  return (
    <form
      id="promoter-character-form"
      onSubmit={handleSubmit}
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <FieldGroup>
        <form.Field
          name="prompt"
          children={field => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field orientation="responsive" data-invalid={isInvalid}>
                <FieldLabel htmlFor="background-prompt" className="leading-[1.2] font-semibold">
                  Background idea
                </FieldLabel>
                <InputGroup aria-invalid={isInvalid || undefined}>
                  <InputGroupTextarea
                    name={field.name}
                    value={field.state.value}
                    onChange={e => {
                      field.handleChange(e.target.value);
                      setPrompt(e.target.value);
                    }}
                    onBlur={field.handleBlur}
                    id="background-prompt"
                    placeholder="Type your prompt here."
                    className="min-h-33 resize-none p-4 pb-0"
                  />
                  <InputGroupAddon
                    align="block-end"
                    className="flex w-full items-center justify-between pt-5 pr-4 pb-2.25 pl-2.5"
                  >
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-foreground h-8 gap-1 px-1.25!"
                      disabled={isGenerating}
                      onClick={() => {
                        const newPrompt = regeneratePrompt();
                        field.setValue(newPrompt);
                      }}
                    >
                      <Ai2Icon className="size-4.5 shrink-0" />
                      <Typography as="span" className="text-xs leading-[1.2]">
                        Regenerate
                      </Typography>
                    </Button>

                    <div className="flex items-center gap-2.5">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Prev prompt"
                        className="text-icon-muted hover:text-foreground h-8 hover:bg-transparent"
                        disabled={!canUndo}
                        onClick={() => {
                          const result = undo();
                          if (result) field.setValue(result);
                        }}
                      >
                        <Undo2 className="size-5 stroke-[1.8]" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Next prompt"
                        className="text-icon-muted hover:text-foreground h-8 hover:bg-transparent"
                        disabled={!canRedo}
                        onClick={() => {
                          const result = redo();
                          if (result) field.setValue(result);
                        }}
                      >
                        <Redo2 className="size-5 stroke-[1.8]" />
                      </Button>
                    </div>
                  </InputGroupAddon>
                </InputGroup>
              </Field>
            );
          }}
        />
      </FieldGroup>

      <Button
        type="submit"
        size="lg"
        className="h-12 w-full rounded-full"
        disabled={!form.state.isValid || isGenerating}
      >
        <Ai3Icon /> Generate BG for 1 credit
      </Button>
    </form>
  );
}
