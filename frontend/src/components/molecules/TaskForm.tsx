import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Input, TextArea, Label } from '../atoms';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`;

interface TaskFormProps {
  initialTitle?: string;
  initialDescription?: string;
  onSubmit: (title: string, description: string) => void;
  onCancel?: () => void;
  submitLabel: string;
  isLoading?: boolean;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  initialTitle = '',
  initialDescription = '',
  onSubmit,
  onCancel,
  submitLabel,
  isLoading = false,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title.trim(), description.trim());
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="title">Título *</Label>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Digite o título da tarefa"
          maxLength={100}
          required
          autoFocus
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="description">Descrição</Label>
        <TextArea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Digite uma descrição (opcional)"
          maxLength={500}
        />
      </FormGroup>
      <ButtonGroup>
        <Button type="submit" disabled={!title.trim() || isLoading}>
          {isLoading ? 'Salvando...' : submitLabel}
        </Button>
        {onCancel && (
          <Button type="button" $variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
        )}
      </ButtonGroup>
    </Form>
  );
};
