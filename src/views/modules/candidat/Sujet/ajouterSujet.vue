<template>
    <div class="container-fluid">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <router-link to="/home">Dashboard</router-link>
            </li>
            <li class="breadcrumb-item active">Categories</li>
        </ol>

        <div class="card mb-3">
            <div class="card-header d-flex">
                <span>
                    <i class="fas fa-chart-area"></i>
                    Categories Management
                </span>
                <button class="btn btn-primary btn-sm ml-auto" v-on:click="showNewCategoryModal"><span class="fa fa-plus"></span> Create New</button>
            </div>
            <div class="card-body">
                <table class="table">
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>Name</td>
                            <td>Image</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Shirt</td>
                            <td>Image</td>
                            <td>
                                <button class="btn btn-primary btn-sm"><span class="fa fa-edit"></span></button>
                                <button class="btn btn-danger btn-sm"><span class="fa fa-trash"></span></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <b-modal ref="newCategoryModal" hide-footer title="Add New Category">
            <div class="d-block">
                <form v-on:submit.prevent="createCategory">
                    <div class="form-group">
                        <label for="name">Enter Name</label>
                        <input type="text" v-model="categoryData.name" class="form-control" id="name" placeholder="Enter category name">
                        <div class="invalid-feedback" v-if="errors.name">{{errors.name[0]}}</div>
                    </div>
                    <div class="form-group">
                        <label for="image">Choose an image</label>
                        <div v-if="categoryData.image.name">
                            <img src="" ref="newCategoryImageDispaly" class="w-150px" />
                        </div>
                        <input type="file" v-on:change="attachImage" ref="newCategoryImage" class="form-control" id="image" />
                        <div class="invalid-feedback" v-if="errors.image">{{errors.image[0]}}</div>
                    </div>

                    <hr>
                    <div class="text-right">
                        <button type="button" class="btn btn-default" v-on:click="hideNewCategoryModal">Cancel</button>
                        <button type="submit" class="btn btn-primary"><span class="fa fa-check"></span> Save</button>
                    </div>
                </form>
            </div>
        </b-modal>
    </div>
</template>

<script>
  
    export default {
        name:'ajouterSujet',
        data() {
            return {
                categoryData: {
                    name: '',
                    image: ''
                },

                errors: {}
            }
        },
        methods: {
            attachImage() {
                this.categoryData.image = this.$refs.newCategoryImage.files[0];
                let reader = new FileReader();
                reader.addEventListener('load', function() {
                    this.$refs.newCategoryImageDispaly.src = reader.result;
                }.bind(this), false);

                reader.readAsDataURL(this.categoryData.image);
            },
            hideNewCategoryModal() {
                this.$refs.newCategoryModal.hide();
            },
            showNewCategoryModal() {
                this.$refs.newCategoryModal.show();
            },
            createCategory: async function() {
                let formData = new FormData();
                formData.append('name', this.categoryData.name);
                formData.append('image', this.categoryData.image);

          
            }
        }
    }
</script>
