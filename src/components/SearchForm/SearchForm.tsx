import React, { useState, useEffect } from 'react';
import { Trans } from 'react-i18next';

import {
  Button,
  DropdownMenu,
  DropdownToggle,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
  UncontrolledDropdown,
} from 'reactstrap';

import styles from './SearchForm.module.scss';

// ToDo: check and fix any double-renders on change/validation

type SearchFormProps = {
  ariaLabel: string;
  searchOptions?: React.ReactNode;
  searchCopy: string;
  disableSearch: boolean;
  feedbackMessageKey?: string;
  id: string;
  maxLength: number;
  onSearch: (query: string) => void;
  readOnly: boolean;
  size: 'lg' | 'sm';
  validator: (query: string) => boolean;
  value?: string;
};

export default function SearchForm({
  ariaLabel,
  searchOptions,
  searchCopy,
  feedbackMessageKey,
  id,
  maxLength,
  onSearch,
  readOnly,
  size,
  value,
  validator,
}: SearchFormProps) {
  const [query, setQuery] = useState(value || '');
  const [isValid, setValidation] = useState(true);

  useEffect(() => {
    const searchInput = document.getElementById(id) as HTMLInputElement;

    if (searchInput) {
      searchInput.focus();
      searchInput.setSelectionRange(0, searchInput.value.length);
    }
  }, [id]);

  useEffect(() => {
    setValidation(validator(query));
  }, [validator, query]);

  const callOnSearch = () => {
    onSearch(query);
  };

  const catchEnter = (event) => {
    if (event.keyCode === 13 && isValid) {
      callOnSearch();
    }
  };

  const disableSearch = !isValid || query.length < 1;
  const searchButton = (
    <Button block size={size} color="success" onClick={callOnSearch} disabled={disableSearch}>
      {searchCopy}
    </Button>
  );

  return (
    <div>
      <Row className="mt-2 g-0">
        <div className="col-12 col-sm-7 pe-sm-3">
          <FormGroup>
            <Label for="title" className="required sr-only">
              {ariaLabel}
            </Label>
            <Input
              type="text"
              name={id}
              id={id}
              bsSize={size}
              value={query}
              invalid={query.length > 1 && !isValid}
              readOnly={readOnly}
              onKeyDown={catchEnter}
              onChange={(e) => setQuery(e.target.value)}
              maxLength={maxLength}
            />
            <FormFeedback valid={query.length < 1 || isValid}>
              {feedbackMessageKey ? <Trans i18nKey={feedbackMessageKey} /> : 'Unknown error'}
            </FormFeedback>
          </FormGroup>
        </div>
        <div className="col-12 col-sm-5">
          {!searchOptions && searchButton}
          {searchOptions && (
            <UncontrolledDropdown group className="w-100">
              {searchButton}
              <DropdownToggle caret color="success" className={disableSearch ? styles['fake-disabled'] : ''} />
              <DropdownMenu>{searchOptions}</DropdownMenu>
            </UncontrolledDropdown>
          )}
        </div>
      </Row>
    </div>
  );
}

SearchForm.defaultProps = {
  disableSearch: false,
  feedbackMessageKey: '',
  maxLength: null,
  readOnly: false,
  size: 'lg',
  validator: () => true,
  value: null,
};
