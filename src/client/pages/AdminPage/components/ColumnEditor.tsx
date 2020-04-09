import React, { useState } from 'react';
import { ColumnInstance } from 'react-table';
import { InventoryItem } from '~/../shared/Types';
import styled from 'styled-components';
import Select from 'react-select';
import { TESC_BLUE, BORDER_RADIUS_LG } from '~/styles/constants';
import { BADSTR } from 'dns';

type Props = {
  allColumns: Array<ColumnInstance<InventoryItem>>
}

const Pill = styled.div`
  border-radius: ${BORDER_RADIUS_LG};
  background: ${TESC_BLUE};
  color: white;

  span {
    margin: 0.2rem;
  }
`

const ColumnEditor: React.FunctionComponent<Props> = (props) => {

  const {allColumns} = props;
  const hiddenColumns = allColumns.filter(c => !c.isVisible);
  const visibleColumns = allColumns.filter(c => c.isVisible);
  const hiddenColumnOptions = hiddenColumns.map(c => ({label: c.Header.toString(), value: c.id, column: c}))

  function onSelect(value: {label: string, value: string, column: ColumnInstance<InventoryItem>}) {
    value.column.toggleHidden();
  }

  return (
    <div className="d-flex mb-3">
      <Select styles={{
        control: base => ({
          ...base,
          borderRadius: BORDER_RADIUS_LG,
          padding: '0.5rem',
          marginRight: '0.5rem',
        }),
        container: base => ({
          ...base,
          width: '10rem'
        })
      }}
      value={'' as any}
      placeholder='Add Columns..'
      onChange={onSelect}
      options={hiddenColumnOptions}
    />
      {visibleColumns
        .filter(column => column.id !== 'expander')
        .map(column => (
          <Pill key={column.id} className="p-2 mr-2 d-flex">
            <span className="d-flex align-items-center justify-content-center">
              <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
              {column.Header}
            </span>
          </Pill>
      ))}
    </div>
  )
}

export default ColumnEditor;