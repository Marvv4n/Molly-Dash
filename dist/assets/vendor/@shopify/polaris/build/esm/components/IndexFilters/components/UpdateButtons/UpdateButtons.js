import React, { useState, useRef, useEffect, useMemo } from 'react';
import { focusFirstFocusableNode } from '../../../../utilities/focus.js';
import { useIsTouchDevice } from '../../../../utilities/use-is-touch-device.js';
import { useI18n } from '../../../../utilities/i18n/hooks.js';
import { Button } from '../../../Button/Button.js';
import { InlineStack } from '../../../InlineStack/InlineStack.js';
import { Modal } from '../../../Modal/Modal.js';
import { Form } from '../../../Form/Form.js';
import { FormLayout } from '../../../FormLayout/FormLayout.js';
import { TextField } from '../../../TextField/TextField.js';

const MAX_VIEW_NAME_LENGTH = 40;
function UpdateButtons({
  primaryAction,
  cancelAction,
  viewNames,
  disabled
}) {
  const i18n = useI18n();
  const [savedViewName, setSavedViewName] = useState('');
  const [savedViewModalOpen, setSavedViewModalOpen] = useState(false);
  const container = useRef(null);
  const isTouchDevice = useIsTouchDevice();
  useEffect(() => {
    if (!container.current || isTouchDevice) return;
    if (savedViewModalOpen) {
      focusFirstFocusableNode(container.current);
    }
  }, [savedViewModalOpen, isTouchDevice]);
  async function handleClickSaveButton() {
    if (primaryAction?.type === 'save-as') {
      handleOpenModal();
    } else {
      await primaryAction?.onAction('');
    }
  }
  function handleOpenModal() {
    setSavedViewModalOpen(true);
  }
  function handleCloseModal() {
    setSavedViewModalOpen(false);
  }
  function handleChange(value) {
    setSavedViewName(value);
  }
  async function handlePrimaryAction() {
    if (isPrimaryActionDisabled) return;
    await primaryAction?.onAction(savedViewName);
    handleCloseModal();
  }
  const buttonText = useMemo(() => {
    switch (primaryAction?.type) {
      case 'save':
        return i18n.translate('Polaris.IndexFilters.UpdateButtons.save');
      case 'save-as':
      default:
        return i18n.translate('Polaris.IndexFilters.UpdateButtons.saveAs');
    }
  }, [primaryAction?.type, i18n]);
  const saveButton = /*#__PURE__*/React.createElement(Button, {
    size: "micro",
    onClick: handleClickSaveButton,
    disabled: primaryAction?.disabled || disabled
  }, buttonText);
  const hasSameNameError = viewNames.some(name => name.trim().toLowerCase() === savedViewName.trim().toLowerCase());
  const isPrimaryActionDisabled = hasSameNameError || !savedViewName || primaryAction?.loading || savedViewName.length > MAX_VIEW_NAME_LENGTH;
  const cancelButtonMarkup = cancelAction ? /*#__PURE__*/React.createElement(Button, {
    variant: "tertiary",
    size: "micro",
    onClick: cancelAction.onAction,
    disabled: disabled
  }, i18n.translate('Polaris.IndexFilters.UpdateButtons.cancel')) : null;
  if (!primaryAction) {
    return cancelButtonMarkup;
  }
  return /*#__PURE__*/React.createElement(InlineStack, {
    align: "start",
    blockAlign: "center",
    gap: "100"
  }, cancelButtonMarkup, primaryAction.type === 'save-as' ? /*#__PURE__*/React.createElement(Modal, {
    activator: /*#__PURE__*/React.createElement(InlineStack, null, saveButton),
    open: savedViewModalOpen,
    title: i18n.translate('Polaris.IndexFilters.UpdateButtons.modal.title'),
    onClose: handleCloseModal,
    primaryAction: {
      onAction: handlePrimaryAction,
      content: i18n.translate('Polaris.IndexFilters.UpdateButtons.modal.save'),
      disabled: isPrimaryActionDisabled
    },
    secondaryActions: [{
      onAction: handleCloseModal,
      content: i18n.translate('Polaris.IndexFilters.UpdateButtons.modal.cancel')
    }]
  }, /*#__PURE__*/React.createElement(Modal.Section, null, /*#__PURE__*/React.createElement(Form, {
    onSubmit: handlePrimaryAction
  }, /*#__PURE__*/React.createElement(FormLayout, null, /*#__PURE__*/React.createElement("div", {
    ref: container
  }, /*#__PURE__*/React.createElement(TextField, {
    label: i18n.translate('Polaris.IndexFilters.UpdateButtons.modal.label'),
    value: savedViewName,
    onChange: handleChange,
    autoComplete: "off",
    maxLength: MAX_VIEW_NAME_LENGTH,
    showCharacterCount: true,
    error: hasSameNameError ? i18n.translate('Polaris.IndexFilters.UpdateButtons.modal.sameName', {
      name: savedViewName
    }) : undefined
  })))))) : saveButton);
}

export { UpdateButtons };