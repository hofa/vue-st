var chepaiInit = function(_cmbProvince, _cmbCity, defaultProvince, defaultCity)
{
	var cmbProvince = document.getElementById(_cmbProvince);
	var cmbCity = document.getElementById(_cmbCity);
	
	function cmbSelect(cmb, str)
	{
		for(var i=0; i<cmb.options.length; i++)
		{
			if(cmb.options[i].value == str)
			{
				cmb.selectedIndex = i;
				return;
			}
		}
	}
	function cmbAddOption(cmb, str, obj)
	{
		var option = document.createElement("OPTION");
		cmb.options.add(option);
		option.innerHTML = str;
		option.value = str;
		option.obj = obj;
	}
	
	function changeCity()
	{
		//cmbArea.options.length = 0;
		if(cmbCity.selectedIndex == -1)return;
		//var item = cmbCity.options[cmbCity.selectedIndex].obj;
		//for(var i=0; i<item.areaList.length; i++)
		//{
		//	cmbAddOption(cmbArea, item.areaList[i], null);
		//}
		//cmbSelect(cmbArea, defaultArea);
	}
	function changeProvince()
	{
		cmbCity.options.length = 0;
		cmbCity.onchange = null;
		if(cmbProvince.selectedIndex == -1)return;
		var item = cmbProvince.options[cmbProvince.selectedIndex].obj;
		for(var i=0; i<item.cityList.length; i++)
		{
			cmbAddOption(cmbCity, item.cityList[i].name, item.cityList[i]);
		}
		cmbSelect(cmbCity, defaultCity);
		changeCity();
		cmbCity.onchange = changeCity;
	}
	
	for(var i=0; i<provinceList.length; i++)
	{
		cmbAddOption(cmbProvince, provinceList[i].name, provinceList[i]);
	}
	cmbSelect(cmbProvince, defaultProvince);
	changeProvince();
	cmbProvince.onchange = changeProvince;
}

var provinceList = [
{name:'京', cityList:[{name:'A'},{name:'C'},{name:'E'},{name:'F'},{name:'G'}]},
{name:'沪', cityList:[{name:'A'},{name:'B'},{name:'C'},{name:'D'}]},
{name:'津', cityList:[{name:'A'},{name:'B'},{name:'C'}]},
{name:'渝', cityList:[{name:'A'},{name:'B'},{name:'C'},{name:'F'},{name:'G'},{name:'H'}]},
{name:'川', cityList:[{name:'A'},{name:'B'},{name:'C'},{name:'D'},{name:'E'},{name:'F'},{name:'H'},{name:'J'},{name:'K'},{name:'L'},{name:'M'},{name:'Q'},{name:'R'},{name:'S'},{name:'T'},{name:'U'},{name:'V'},{name:'W'},{name:'X'},{name:'Y'},{name:'Z'}]},
{name:'贵', cityList:[{name:'A'},{name:'B'},{name:'C'},{name:'D'},{name:'E'},{name:'F'},{name:'G'},{name:'H'},{name:'J'}]},
{name:'云', cityList:[{name:'A'},{name:'B'},{name:'C'},{name:'D'},{name:'E'},{name:'F'},{name:'G'},{name:'H'},{name:'J'},{name:'L'},{name:'K'},{name:'M'},{name:'N'},{name:'P'},{name:'Q'},{name:'R'},{name:'S'}]},
{name:'藏', cityList:[{name:'A'},{name:'B'},{name:'C'},{name:'D'},{name:'E'},{name:'F'},{name:'G'}]},
{name:'豫', cityList:[{name:'A'},{name:'B'},{name:'C'},{name:'D'},{name:'E'},{name:'F'},{name:'G'},{name:'H'},{name:'J'},{name:'K'},{name:'L'},{name:'M'},{name:'N'},{name:'P'},{name:'Q'},{name:'R'},{name:'S'},{name:'U'}]},
{name:'鄂', cityList:[{name:'A'},{name:'B'},{name:'C'},{name:'D'},{name:'E'},{name:'F'},{name:'G'},{name:'H'},{name:'J'},{name:'K'},{name:'L'},{name:'M'},{name:'N'},{name:'P'},{name:'Q'}]},
{name:'湘', cityList:[{name:'A'},{name:'B'},{name:'C'},{name:'D'},{name:'E'},{name:'F'},{name:'G'},{name:'H'},{name:'J'},{name:'K'},{name:'L'},{name:'M'},{name:'N'},{name:'P'}]},
{name:'粤', cityList:[{name:'A'},{name:'B'},{name:'C'},{name:'D'},{name:'E'},{name:'F'},{name:'G'},{name:'H'},{name:'J'},{name:'K'},{name:'L'},{name:'M'},{name:'N'},{name:'P'},{name:'Q'},{name:'R'},{name:'S'},{name:'T'},{name:'U'},{name:'V'},{name:'W'},{name:'X'},{name:'Y'},{name:'Z'}]},
{name:'桂', cityList:[{name:'A'},{name:'B'},{name:'C'},{name:'D'},{name:'E'},{name:'J'},{name:'K'},{name:'L'},{name:'M'},{name:'N'},{name:'P'}]},
{name:'陕', cityList:[{name:'A'},{name:'B'},{name:'C'},{name:'D'},{name:'E'},{name:'F'},{name:'G'},{name:'H'},{name:'J'},{name:'K'},{name:'U'},{name:'V'}]},
{name:'甘', cityList:[{name:'A'},{name:'B'},{name:'C'},{name:'D'},{name:'E'},{name:'F'},{name:'G'},{name:'H'},{name:'J'},{name:'K'},{name:'L'},{name:'M'},{name:'N'},{name:'P'}]},
{name:'青', cityList:[{name:'A'},{name:'B'},{name:'C'},{name:'D'},{name:'E'},{name:'F'},{name:'G'},{name:'H'}]},
{name:'宁', cityList:[{name:'A'},{name:'B'},{name:'C'},{name:'D'}]},
{name:'新', cityList:[{name:'A'},{name:'B'},{name:'C'},{name:'D'},{name:'E'},{name:'F'},{name:'G'},{name:'H'},{name:'J'},{name:'K'},{name:'L'},{name:'M'},{name:'N'},{name:'P'},{name:'Q'},{name:'R'}]},
{name:'冀', cityList:[{name:'A'},{name:'B'},{name:'C'},{name:'D'},{name:'E'},{name:'F'},{name:'G'},{name:'H'},{name:'J'},{name:'K'},{name:'L'},{name:'M'},{name:'N'},{name:'P'},{name:'Q'},{name:'R'},{name:'S'},{name:'U'}]},
{name:'晋', cityList:[{name:'A'},{name:'B'},{name:'C'},{name:'D'},{name:'E'},{name:'F'},{name:'H'},{name:'J'},{name:'K'},{name:'L'},{name:'M'}]},
{name:'蒙', cityList:[{name:'A'},{name:'B'},{name:'C'},{name:'D'},{name:'E'},{name:'F'},{name:'G'},{name:'H'},{name:'J'},{name:'K'},{name:'L'}]},
{name:'苏', cityList:[{name:'A'},{name:'B'},{name:'C'},{name:'D'},{name:'E'},{name:'F'},{name:'G'},{name:'H'},{name:'J'},{name:'K'},{name:'L'},{name:'M'},{name:'N'}]},
{name:'浙', cityList:[{name:'A'},{name:'B'},{name:'C'},{name:'D'},{name:'E'},{name:'F'},{name:'G'},{name:'H'},{name:'J'},{name:'K'},{name:'L'}]},
{name:'皖', cityList:[{name:'A'},{name:'B'},{name:'C'},{name:'D'},{name:'E'},{name:'F'},{name:'G'},{name:'H'},{name:'J'},{name:'K'},{name:'L'},{name:'M'},{name:'N'},{name:'P'},{name:'Q'},{name:'R'}]},
{name:'闽', cityList:[{name:'A'},{name:'B'},{name:'C'},{name:'D'},{name:'E'},{name:'F'},{name:'G'},{name:'H'},{name:'J'},{name:'K'}]},
{name:'赣', cityList:[{name:'A'},{name:'B'},{name:'C'},{name:'D'},{name:'E'},{name:'F'},{name:'G'},{name:'H'},{name:'J'},{name:'K'},{name:'L'}]},
{name:'鲁', cityList:[{name:'A'},{name:'B'},{name:'C'},{name:'D'},{name:'E'},{name:'F'},{name:'G'},{name:'H'},{name:'J'},{name:'K'},{name:'L'},{name:'M'},{name:'N'},{name:'P'},{name:'Q'},{name:'R'},{name:'U'},{name:'V'},{name:'W'}]},
{name:'辽', cityList:[{name:'A'},{name:'B'},{name:'C'},{name:'D'},{name:'E'},{name:'F'},{name:'G'},{name:'H'},{name:'J'},{name:'K'},{name:'L'},{name:'M'},{name:'N'},{name:'P'},{name:'V'}]},
{name:'吉', cityList:[{name:'A'},{name:'B'},{name:'C'},{name:'D'},{name:'E'},{name:'F'},{name:'G'},{name:'H'}]},
{name:'黑', cityList:[{name:'A'},{name:'B'},{name:'C'},{name:'D'},{name:'E'},{name:'F'},{name:'G'},{name:'H'},{name:'J'},{name:'K'},{name:'L'},{name:'M'},{name:'N'},{name:'P'}]},
{name:'琼', cityList:[{name:'A'},{name:'B'},{name:'C'}]}
];