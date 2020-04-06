import React from 'react';
import { OptionsType, SelectComponentsConfig } from 'react-select';
import Creatable from 'react-select/creatable';
import { TESC_BLUE, BORDER_RADIUS, MEDIUM_GRAY } from '~/styles/constants';

type OptionType<T> = {value: T, label: string};

type Props<T> = {
  onChange: (e: Array<T>) => void;
  value: Array<T>;
  options: Array<T>;
  components?: SelectComponentsConfig<OptionType<T>>
  // pure function that maps the given data type to an OptionType
  mapValueToOption: (e: T) => OptionType<T>;
}

// Rip manually typing the component type bc TS :(
function InputWithChips<T>(props: Props<T> & {children?: React.ReactNode}) {

  function onChange(value: Array<OptionType<T>>) {
    const vals = value?.map(x => x.value) ?? [];
    props.onChange(vals);
  }

  function mapArrayToOptions(arr: Array<T>): OptionsType<OptionType<T>> {
    return arr.map(props.mapValueToOption);
  }

  return (
    <Creatable<OptionType<T>> 
      isMulti={true}
      onChange={onChange}
      components={props.components}
      options={mapArrayToOptions(props.options)}
      value={mapArrayToOptions(props.value)}
      styles={{
        multiValueLabel: base => ({
          ...base,
          borderRadius: `${BORDER_RADIUS} 0 0 ${BORDER_RADIUS}`,
          background: TESC_BLUE,
          color: 'white'
        }),
        multiValue: base => ({
          ...base,
          background: 'transparent'
        }),
        multiValueRemove: base => ({
          ...base,
          borderRadius: `0 ${BORDER_RADIUS} ${BORDER_RADIUS} 0`,
          background: MEDIUM_GRAY
        }),
        control: base => ({
          ...base,
          borderRadius: `${BORDER_RADIUS} !important`
        })
      }}
    />
  );
}

export default InputWithChips;