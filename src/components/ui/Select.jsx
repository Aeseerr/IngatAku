function SelectField({

  label,

  name,

  value,

  onChange,

  options

}) {

  return (

    <div>

      <label className="
        block
        text-sm
        font-semibold
        text-slate-700
        mb-3
      ">

        {label}

      </label>

      <select

        name={name}

        value={value}

        onChange={onChange}

        className="
          app-input
          h-12
        "
      >

        {options.map(item => {

          // ==================================
          // STRING OPTION
          // ==================================
          if (
            typeof item === 'string'
          ) {

            return (

              <option

                key={item}

                value={item}

              >

                {item}

              </option>

            )
          }

          // ==================================
          // OBJECT OPTION
          // ==================================
          return (

            <option

              key={item.value}

              value={item.value}

            >

              {item.label}

            </option>

          )

        })}

      </select>

    </div>

  )
}