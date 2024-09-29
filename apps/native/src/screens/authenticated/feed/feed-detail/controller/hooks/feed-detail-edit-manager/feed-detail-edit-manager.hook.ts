import { useCallback, useState } from 'react';

type IFeed_DetailEditManagerInput = void;
type IFeed_DetailEditManagerOutput = {
  newContent: string;
  isEdit: boolean;
  startEdit: () => void;
  endEdit: () => void;
  setContent: (text: string) => void;
};

export const useFeed_DetailEditManager: Hook<
  IFeed_DetailEditManagerInput,
  IFeed_DetailEditManagerOutput
> = () => {
  const [newContent, setNewContent] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const startEdit = useCallback(() => {
    setIsEdit(true);
  }, [isEdit, setIsEdit]);

  const endEdit = useCallback(() => {
    setIsEdit(false);
  }, [isEdit, setIsEdit]);

  const setContent = useCallback(
    (text: string) => {
      setNewContent(text);
    },
    [newContent, setNewContent],
  );

  return { newContent, isEdit, startEdit, endEdit, setContent };
};
