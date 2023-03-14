import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._types = [
            {id: 1, name: "Чай"},
            {id: 2, name: "Кофе"}
        ]

        this._brand = [
            {id: 1, name: "Greenfield"},
            {id: 2, name: "Tess"},
            {id: 3, name: "Ahmad Tea"},
            {id: 4, name: "Nescafe"},
            {id: 5, name: "Egoist"},
            {id: 6, name: "Jardin"}
        ]

        this._items = [
            {id: 1, name: "Christmas Mystery", brandId: 1, typeId: 1, price: 99, img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmarket.yandex.ru%2Fproduct--chai-chernyi-greenfield-christmas-mystery-v-paketikakh%2F150019012%3Fsku%3D100407356264&psig=AOvVaw1MX8t7VYRSJsWb9IrKoF_v&ust=1678471412780000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCNj70rS3z_0CFQAAAAAdAAAAABAT"},
            {id: 2, name: "Egoist fineart", brandId: 5, typeId: 2, price: 600, img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmarket.yandex.ru%2Fproduct--chai-chernyi-greenfield-christmas-mystery-v-paketikakh%2F150019012%3Fsku%3D100407356264&psig=AOvVaw1MX8t7VYRSJsWb9IrKoF_v&ust=1678471412780000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCNj70rS3z_0CFQAAAAAdAAAAABAT"},
            {id: 3, name: "Black rows", brandId: 6, typeId: 2, price: 200, img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmarket.yandex.ru%2Fproduct--chai-chernyi-greenfield-christmas-mystery-v-paketikakh%2F150019012%3Fsku%3D100407356264&psig=AOvVaw1MX8t7VYRSJsWb9IrKoF_v&ust=1678471412780000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCNj70rS3z_0CFQAAAAAdAAAAABAT"},
        ]

        this._avgRating = 4

        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }

    setBrand(brand) {
        this._brand = brand
    }

    setItems(items) {
        this._items = items
    }


    get Types() {
        return this._types
    }

    get Brand() {
        return this._brand
    }

    get Items() {
        return this._items
    }

    get AvgRating() {
        return this._avgRating
    }


}