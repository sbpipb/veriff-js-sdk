import { camelCaseToSlug } from './util';
import { TemplateOptions } from './veriff';

interface InputCreationOptions {
  type: string;
  value?: string;
  name: string;
  label?: string;
  required: boolean;
}

interface CreationOptions {
  container: HTMLFormElement;
  name: string;
  label: string;
  shouldRender: boolean;
  required: boolean;
}

export function createTemplate({ parentId, person, formLabel, submitBtnText, vendorData }: TemplateOptions) {
  const parent = document.getElementById(parentId);
  if (!parent) {
    throw new Error(`Element ${parentId} does not exists`);
  }
  parent.innerHTML = '';

  function createInputIfNeeded({ container, name, label, shouldRender, required }: CreationOptions) {
    if (shouldRender) {
      const input = createInput({ type: 'text', name, label, required });
      container.appendChild(input);
    }
  }

  function createInput({ type, value, name, label, required }: InputCreationOptions) {
    const input = document.createElement('input');
    input.setAttribute('type', type);
    input.setAttribute('class', `veriff-${type}`);
    input.setAttribute('id', `veriff-${camelCaseToSlug(name)}`);
    input.setAttribute('name', name);
    input.required = required;

    if (type === 'submit' && value) {
      input.value = value;
    } else {
      input.setAttribute('placeholder', label);
    }

    return input;
  }

  function createDescription() {
    const companyLink = document.createElement('a');
    const linkText = document.createTextNode('Veriff');
    companyLink.appendChild(linkText);
    companyLink.title = 'Veriff';
    companyLink.href = 'https://www.veriff.com/';
    companyLink.target = '_blank';

    const description = document.createElement('p');
    const descriptionText = document.createTextNode(
      ' is an identity verification provider that helps companies connect with customers.',
    );
    description.appendChild(companyLink);
    description.appendChild(descriptionText);
    description.setAttribute('class', 'veriff-description');

    return description;
  }

  const fragment = document.createDocumentFragment();
  const container = document.createElement('form');

  container.setAttribute('class', 'veriff-container');
  container.setAttribute('name', 'veriff-form');

  createInputIfNeeded({
    container,
    name: 'givenName',
    label: formLabel.givenName,
    shouldRender: !person.givenName,
    required: true,
  });

  createInputIfNeeded({
    container,
    name: 'lastName',
    label: formLabel.lastName,
    shouldRender: !person.lastName,
    required: true,
  });

  createInputIfNeeded({
    container,
    name: 'vendorData',
    label: formLabel.vendorData,
    shouldRender: !vendorData,
    required: false,
  });

  const submit = createInput({ type: 'submit', name: 'submitBtn', value: submitBtnText, required: true });
  container.appendChild(submit);

  const description = createDescription();
  container.appendChild(description);

  fragment.appendChild(container);
  parent.appendChild(fragment);
  return container;
}
