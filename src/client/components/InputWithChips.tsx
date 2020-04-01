import React from 'react';
import { OptionsType } from 'react-select';
import Creatable from 'react-select/creatable';
import { TESC_BLUE, BORDER_RADIUS, MEDIUM_GRAY } from '~/styles/constants';

type OptionType = {value: string, label: string};

type Props = {
  onChange: (e: Array<string>) => void;
  value: Array<string>
}

const InputWithChips: React.FunctionComponent<Props> = (props) => {

  function onChange(value: Array<OptionType>) {
    const vals = value.map(x => x.label);
    props.onChange(vals);
  }

  //TODO: investigate if React.useMemo would be helpful here.
  function mapArrayToOptions(arr: Array<string>): OptionsType<OptionType> {
    return arr.map(x => ({value: x, label: x}));
  }

  return (
    <Creatable
      isMulti={true}
      onChange={onChange}
      options={mapArrayToOptions(['a', 'b'])}
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