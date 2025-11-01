    import React, { useState } from "react";
    import { api } from './../Utils/api';
    import {
        UploadCloud,
        Plus,
        Trash2,
        GripVertical,
        Save,
        X
    } from 'lucide-react';

    const Section = ({ title, children }) => (
        <div className="bg-white min-w-[400px] rounded-xl shadow-lg p-6 md:p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-3">
                {title}
            </h3>
            {children}
        </div>
    );

    const MenuItemsEditor = ({ item, onUpdate, onRemove }) => {

        const addSubItem = () => {
            const newsubitems = {
                id: Date.now(),
                title: '',
                url: ''
            }
            const allsubitems = [...item.subItems, newsubitems]
            onUpdate(item.id, { ...item, subItems: allsubitems })

        }

        const removeSubItem = (subid) => {
            const filteredsubitem = item.subItems.filter((item) => (item.id !== subid))
            onUpdate(item.id, { ...item, subItems: filteredsubitem })
        }

        const handlemenuFieldChange = (id, value) => {
            onUpdate(item.id, { ...item, [id]: value })
        }

        const handleSubItemChange = (subId, field, value) => {
            const updatedSubItems = item.subItems.map((sub) =>
                sub.id === subId ? { ...sub, [field]: value } : sub
            );
            onUpdate(item.id, { ...item, subItems: updatedSubItems });
        };

        return (
            <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50/50">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <GripVertical className="hidden md:block text-gray-400 " />

                    <input
                        type="text"
                        placeholder="Title"
                        value={item.title}
                        onChange={(e) => handlemenuFieldChange('title', e.target.value)}
                        className="border rounded-md px-3 py-2 w-full md:w-1/3"
                    />
                    <input
                        type="text"
                        placeholder="URL (e.g., /about)"
                        value={item.url}
                        onChange={(e) => handlemenuFieldChange('url', e.target.value)}
                        className="border rounded-md px-3 py-2 w-full md:w-1/3"
                    />

                    <label className="flex items-center gap-2 text-sm text-gray-700 select-none">
                        <input
                            type="checkbox"
                            className="accent-blue-600 w-4 h-4"
                            checked={item.isVisible}
                            onChange={(e) => handlemenuFieldChange('isVisible', e.target.checked)}
                        />
                        Visible
                    </label>

                    <button
                        onClick={() => onRemove(item.id)}
                        className="ml-auto text-red-500 hover:text-red-700 transition p-1">
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
                {/* subItems */}
                <div className="pl-6 md:pl-12 mt-4">
                    {item?.subItems.map((subItem) => (
                        <div key={subItem.id} className="flex flex-col sm:flex-row gap-2 mb-3 items-center">
                            <input
                                type="text"
                                placeholder="Sub Title"
                                value={subItem.title}
                                onChange={(e) => handleSubItemChange(subItem.id, 'title', e.target.value)}
                                className="border rounded-md px-3 py-2 w-full sm:w-1/3"
                            />
                            <input
                                type="text"
                                placeholder="Sub URL"
                                value={subItem.url}
                                onChange={(e) => handleSubItemChange(subItem.id, 'url', e.target.value)}
                                className="border rounded-md px-3 py-2 w-full sm:w-1/3"
                            />
                            <button
                                onClick={() => removeSubItem(subItem.id)}
                                className="text-gray-400 hover:text-red-500 transition p-1">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={addSubItem}
                        className="text-sm text-white bg-blue-600 p-2 rounded-md cursor-pointer hover:underline flex items-center gap-1">
                        <Plus className="w-4 h-4" /> Add Sub Item
                    </button>
                </div>
            </div>
        )
    }

    function Navbar() {
        const [formData, setFormData] = useState({
            logo: {
                url: '',
                altText: ""
            },
            companyDetail: {
                name: '',
                tagline: '',
                foundyear: ''
            },
            menuItems: [
                {
                    id: Date.now(),
                    title: '',
                    url: '',
                    isVisible: true,
                    subItems: [
                        {
                            id: Date.now(),
                            title: '',
                            url: '',
                        }
                    ]
                }
            ]
        });




        const addMenuNewItem = () => {
            const newItem = {
                id: Date.now(),
                title: '',
                url: '',
                isVisible: false,
                subItems: []
            }
            const d = [...formData.menuItems, newItem]
            setFormData((prev) => ({ ...prev, menuItems: d }))
        }
        // console.log(menuItems);

        const updatesubMenuItem = (id, updatedItem) => {
            setFormData((prev) => ({
                ...prev,
                menuItems: prev.menuItems.map((item) => (item.id === id ? updatedItem : item))
            }))
        }

        const removeMenuItem = (id) => {
            setFormData((prev) => ({
                ...prev,
                menuItems: prev.menuItems.filter((p) => p.id !== id)

            }))
        }

        const handleLogoChange = (e) => {
            const file = e.target.files[0]

            if (file) {
                const preview = URL.createObjectURL(file);
                setFormData((prev) => ({ ...prev,
                    logo:{...prev.logo,url:preview}
                }))
            }
        }

        const onformSubmit = async (e) => {
            e.preventDefault()
            console.log(formData, 'formdata');
            try {
                console.log("Form Data before PUT:", formData);
                const res = await api.put('/navbar/updatenavbar', formData);
                console.log("Response:", res.data);
            } catch (error) {
                console.error("Backend error:", error.response?.data || error.message);
            }


        }

        const handlecompanyDetails = (id, value) => {
            setFormData((prev) => ({
                ...prev,
                companyDetail: {
                    ...prev.companyDetail,
                    [id]: value
                }
            }))
        }

        return (

            <div className=" bg-white min-h-screen rounded-xl shadow-lg p-6 md:p-8">
                {/* Header */}
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800 text-center md:text-left">
                    Navbar Configuration
                </h2>
                <form onSubmit={onformSubmit}>
                    {/* Logo Upload */}
                    <Section title="Logo & Branding">
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="w-28 h-28 border-2 border-dashed rounded-lg flex items-center justify-center bg-gray-50 text-gray-400">
                                {formData.logo.url ? (
                                    <img src={formData.logo.url} alt="Logo Preview" className="w-full h-full object-contain rounded-lg" />
                                ) : (
                                    <UploadCloud className="w-8 h-8" />
                                )}
                            </div>
                            <input
                                type="file"
                                onChange={handleLogoChange}
                                accept="image/*"
                                className=" text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
                            />
                        </div>
                        <div>
                            <label htmlFor="" className='block mt-5 text-sm font-medium text-gray-700 mb-1.5'>AltText</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Your Company Inc."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.logo.altText}
                                onChange={(e) => setFormData((prev) => ({
                                    ...prev,
                                    logo: { ...prev.logo, altText: e.target.value }
                                }))}
                            />
                        </div>
                    </Section>

                    {/* company deatils */}
                    <Section title='Company details'>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1.5'>Company Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Your Company Inc."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.companyDetail.name}
                                    onChange={(e) => handlecompanyDetails('name', e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1.5'>Title</label>
                                <input
                                    id="Title"
                                    type="text"
                                    placeholder="Slogan"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.companyDetail.tagline}
                                    onChange={(e) => handlecompanyDetails('tagline', e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1.5'>Founding Year</label>
                                <input
                                    id="Founding"
                                    type="number"
                                    placeholder="Founding Year"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.companyDetail.foundyear}
                                    onChange={(e) => handlecompanyDetails('foundyear', e.target.value)}
                                />
                            </div>

                        </div>
                    </Section>

                    {/* Menu Items Section */}

                    <Section title='Menus Items'>
                        <div className="flex justify-end mb-4">
                            <button
                                onClick={addMenuNewItem}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" /> Add Menu Item
                            </button>
                        </div>
                        <div>
                            {/* Render MenuItem here */}
                            {formData.menuItems.map((item, i) => (<div key={i} className=" mb-5">
                                <MenuItemsEditor item={item}
                                    onUpdate={updatesubMenuItem} onRemove={removeMenuItem}
                                />
                            </div>
                            ))}
                            {/* You can repeat MenuItem components as needed */}
                        </div>
                    </Section>


                    {/* Save Button */}
                    <div className="mt-8 text-right">
                        <button type="submit" className="bg-green-600 text-white px-8 py-2.5 rounded-lg hover:bg-green-700 transition text-base font-medium flex items-center gap-2 ml-auto cursor-pointer">
                            <Save className="w-5 h-5" /> Save Changes
                        </button>
                    </div>
                </form>
            </div>

        );
    }

    export default Navbar;
