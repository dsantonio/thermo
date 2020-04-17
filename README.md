# Thermo

Nodejs api based on [Neutrium.thermo.IAPWS97](https://github.com/neutrium/thermo.eos.iapws97)

## POST methods

body: {
  "p": 3000000,
  "s": 3.4 
}
/iapws97_PS

body: {
  "p": 3000000,
  "h": 1500
}
/iapws97_PH

body: {
  "p": 3000000,
  "t": 300
}
/iapws97_PT

body: {
  "h": 1500,
  "s": 3.4 
}
/iapws97_HS

body 

### Response

	{
		p, 		// Pressure, p, Pa
		t, 		// Temperature, t, K
		v, 		// Specific volume, v, m^3/kg
		rho,	// Density, rho, kg/m^3
		u,		// Specific internal energy, u, kJ/kg
		s,		// Specific entropy, s, kJ/kg
		h, 		// Specific enthalpy, h, kJ/kg.K
		cp,		// Specific isobaric heat capacity, Cp kJ/kg.K
		cv,		// Specific isochoric heat capacity, Cv
		w,		// Speed of Sound, w, m/s
		mu,		// Viscosity cP,
		k,		// Thermal Conductivity W/m.K
		sigma,	// Surface Tension mN/m
		epsilon,// Dielectric constant
		ic		// Ionisation constant
	}
