<style>
.container-fluid{
    background-color: #f3f0f0;
}
</style>
<template>
    <v-divider></v-divider>
    <v-divider></v-divider>
    <v-divider></v-divider>
    <v-container>
        <v-row>
            <v-col>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-card>
                               <v-container>
                                <v-tabs
                                    v-model="tab"
                                    color="deep-purple-accent-4"
                                    >
                                    <v-tab value="one">Starters</v-tab>
                                    <v-tab value="two">Breakfast</v-tab>
                                    <v-tab value="three">Lunch</v-tab>
                                    <v-tab value="four">Supper</v-tab>
                                    <v-tab value="five">Desserts</v-tab>
                                    <v-tab value="six">Beverages</v-tab>
                                </v-tabs>
                                   
                               </v-container>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-window v-model="tab">
                        <v-window-item value="one">
                        <v-container>
                            <v-row style="height: 700px; overflow-y: scroll">

                                <v-col v-for="(item, index) in cardItems" :key="index" cols="3">
                                    <v-card>
                                        <v-container>
                                            <v-row>
                                                <v-img
                                                    height="100"
                                                    :src="item.image"
                                                    cover
                                                    class="text-white"
                                                ></v-img>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="12" align="center">
                                                    {{ item.name }}
                                                </v-col>
                                                <v-col cols="12" align="center">
                                                    {{ item.category }}
                                                </v-col>
                                                <v-col cols="12" align="center">
                                                    {{ item.price }}
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-window-item>

                    <v-window-item value="two">
                        <v-container>
                            <v-row style="height: 700px; overflow-y: scroll">

                                <v-col v-for="(item, index) in cardItems" :key="index" cols="3">
                                    <v-card>
                                        <v-container>
                                            <v-row>
                                                <v-img
                                                    height="100"
                                                    :src="item.image"
                                                    cover
                                                    class="text-white"
                                                ></v-img>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="12" align="center">
                                                    {{ item.name }}
                                                </v-col>
                                                <v-col cols="12" align="center">
                                                    {{ item.category }}
                                                </v-col>
                                                <v-col cols="12" align="center">
                                                    {{ item.price }}
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-window-item>

                    <v-window-item value="three">
                        <v-container>
                            <v-row style="height: 700px; overflow-y: scroll">

                                <v-col v-for="(item, index) in cardItems" :key="index" cols="3">
                                    <v-card>
                                        <v-container>
                                            <v-row>
                                                <v-img
                                                    height="100"
                                                    :src="item.image"
                                                    cover
                                                    class="text-white"
                                                ></v-img>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="12" align="center">
                                                    {{ item.name }}
                                                </v-col>
                                                <v-col cols="12" align="center">
                                                    {{ item.category }}
                                                </v-col>
                                                <v-col cols="12" align="center">
                                                    {{ item.price }}
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-window-item>

                    <v-window-item value="four">
                        <v-container>
                            <v-row style="height: 700px; overflow-y: scroll">

                                <v-col v-for="(item, index) in cardItems" :key="index" cols="3">
                                    <v-card>
                                        <v-container>
                                            <v-row>
                                                <v-img
                                                    height="100"
                                                    :src="item.image"
                                                    cover
                                                    class="text-white"
                                                ></v-img>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="12" align="center">
                                                    {{ item.name }}
                                                </v-col>
                                                <v-col cols="12" align="center">
                                                    {{ item.category }}
                                                </v-col>
                                                <v-col cols="12" align="center">
                                                    {{ item.price }}
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-window-item>

                    <v-window-item value="five">
                        <v-container>
                            <v-row style="height: 700px; overflow-y: scroll">

                                <v-col v-for="(item, index) in cardItems" :key="index" cols="3">
                                    <v-card>
                                        <v-container>
                                            <v-row>
                                                <v-img
                                                    height="100"
                                                    :src="item.image"
                                                    cover
                                                    class="text-white"
                                                ></v-img>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="12" align="center">
                                                    {{ item.name }}
                                                </v-col>
                                                <v-col cols="12" align="center">
                                                    {{ item.category }}
                                                </v-col>
                                                <v-col cols="12" align="center">
                                                    {{ item.price }}
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-window-item>

                    <v-window-item value="six">
                        <v-container>
                            <v-row style="height: 700px; overflow-y: scroll">

                                <v-col v-for="(item, index) in cardItems" :key="index" cols="3">
                                    <v-card elevation="8">
                                        <v-container>
                                            <v-row>
                                                <v-img
                                                    height="100"
                                                    :src="item.image"
                                                    cover
                                                    class="text-white"
                                                ></v-img>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="12" align="center">
                                                    {{ item.name }}test
                                                </v-col>
                                                <v-col cols="12" align="center">
                                                    {{ item.category }}
                                                </v-col>
                                                <v-col cols="12" align="center">
                                                    {{ item.price }}
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-window-item>
                    </v-window>
                    </v-row>
                </v-container>
            </v-col>
            <v-col cols="6">
                <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-card>
                            <v-container>
                                <v-row>
                                    <v-col cols="6">
                                      <v-container>
                                        <v-row>
                                            <v-col>
                                                <v-btn variant="tonal" >
                                                    <v-icon>mdi-plus</v-icon>
                                                    <span>Add Customer</span>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                      </v-container>
                                    </v-col>
                                    <v-col cols="6" >
                                       <v-container>
                                        <v-row>
                                            <v-col align="right">
                                                <v-btn class="mr-5" variant="tonal">
                                                <v-icon>mdi-plus</v-icon>
                                                </v-btn>
                                                <v-btn class="mr-5" variant="tonal">
                                                    <v-icon>mdi-barcode</v-icon>
                                                </v-btn>
                                                <v-btn class="mr-5" variant="tonal">
                                                    <v-icon>mdi-reload</v-icon>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                       </v-container>
                                    </v-col>
                                    <v-divider></v-divider>
                                </v-row>
                                <v-row>
                                    <v-container>
                                        <v-row>
                                           <v-col cols="12">
                                                <v-sheet  
                                                color="grey-lighten-4"
                                                rounded
                                                >
                                                    <v-container>
                                                        <v-row>
                                                            <v-col cols="1" class="mt-2">
                                                                <v-btn
                                                                size="x-small"
                                                                    :ripple="false"
                                                                    variant="text"
                                                                    :icon="show ? 'mdi-chevron-down' : 'mdi-chevron-right'"
                                                                    @click="show = !show"
                                                                ></v-btn>
                                                            </v-col>
                                                            <v-col cols="1" class="mt-3">
                                                                <span>1</span>
                                                            </v-col>
                                                            <v-col cols="5" class="mt-3">
                                                                Chicken Adobo 
                                                            </v-col>
                                                            <v-col cols="4" align="right" class="mt-3">
                                                                ₱150.00
                                                            </v-col>
                                                        
                                                            <v-col cols="1" class="mt-2"> 
                                                              <v-btn icon="mdi-close" size="x-small">
                                                              </v-btn>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row>
                                                            <v-expand-transition>
                                                                <div v-show="show">
                                                                    <v-divider></v-divider>

                                                                    <v-card-text>
                                                                      <v-container>
                                                                        <v-row>
                                                                            <v-col cols="6">
                                                                                <v-text-field label="Quantity" variant="outlined"  size="50"></v-text-field>
                                                                            </v-col>

                                                                            <v-col cols="6">
                                                                                <v-text-field label="Discount(%)" variant="outlined"  size="50"></v-text-field>
                                                                            </v-col>
                                                                        </v-row>
                                                                      </v-container>
                                                                    </v-card-text>
                                                                </div>
                                                            </v-expand-transition>
                                                        </v-row>
                                                    </v-container>
                                                </v-sheet>
                                           </v-col>
                                        </v-row>
                                    </v-container>
                                </v-row>

                                <v-row>
                                    <v-container>
                                        <v-row>
                                           <v-col cols="12">
                                                <v-sheet  
                                                color="orange-lighten-5"
                                                rounded
                                                >
                                                    <v-container>
                                                        <v-row>
                                                            <v-col cols="6">
                                                               Add
                                                            </v-col>
                                                            <v-col cols="2">
                                                                <span class="text-orange-lighten-1">Discount</span>
                                                            </v-col>
                                                            <v-col cols="2">
                                                                <span class="text-orange-lighten-1">Coupon</span>
                                                            </v-col>
                                                            <v-col cols="2">
                                                                <span class="text-orange-lighten-1">Note</span>
                                                            </v-col>
                                                        </v-row>
                                                    </v-container>
                                                </v-sheet>
                                           </v-col>
                                        </v-row>
                                    </v-container>
                                </v-row>
                            </v-container>
                        </v-card>
                        <v-sheet color="grey-lighten-4">
                            <v-container>
                                <v-row>
                                    <v-col>
                                        <v-container>
                                            <v-row>
                                                <v-col>
                                                    Subtotal
                                                </v-col>
                                                <v-col align="right">
                                                    ₱150.00 
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col>
                                                    Tax
                                                </v-col>
                                                <v-col align="right">
                                                    ₱12.00 
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col>
                                                    Payable Amount
                                                </v-col>
                                                <v-col align="right">
                                                    ₱162.00 
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col>
                                                    <v-btn block height="50" color="orange">
                                                        <v-icon>mdi-pause</v-icon>
                                                        Hold Order
                                                    </v-btn>
                                                </v-col>
                                                <v-col>
                                                    <v-btn block height="50" color="green">
                                                        <v-icon>mdi-credit-card</v-icon>Proceed
                                                    </v-btn>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-sheet>
                      </v-col>
                    </v-row>
                </v-container>
            </v-col>
        </v-row>
      
    </v-container>

</template>


<script>
export default {
  data() {
    return {
        tab: null,
        show: false,
      cardItems: [
        {
          name: 'Chicken Adobo',
          category: 'Category Name',
          price: '₱150.00',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrf6xM-8dfixY4sWxI8c9iY0OX5gIjQ_t0oNtawrb0Q&s',
        },
        {
          name: 'Chicken Adobo',
          category: 'Category Name',
          price: '₱150.00',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrf6xM-8dfixY4sWxI8c9iY0OX5gIjQ_t0oNtawrb0Q&s',
        },
        {
          name: 'Chicken Adobo',
          category: 'Category Name',
          price: '₱150.00',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrf6xM-8dfixY4sWxI8c9iY0OX5gIjQ_t0oNtawrb0Q&s',
        },
        {
          name: 'Chicken Adobo',
          category: 'Category Name',
          price: '₱150.00',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrf6xM-8dfixY4sWxI8c9iY0OX5gIjQ_t0oNtawrb0Q&s',
        },
        {
          name: 'Chicken Adobo',
          category: 'Category Name',
          price: '₱150.00',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrf6xM-8dfixY4sWxI8c9iY0OX5gIjQ_t0oNtawrb0Q&s',
        },
        {
          name: 'Chicken Adobo',
          category: 'Category Name',
          price: '₱150.00',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrf6xM-8dfixY4sWxI8c9iY0OX5gIjQ_t0oNtawrb0Q&s',
        },
        {
          name: 'Chicken Adobo',
          category: 'Category Name',
          price: '₱150.00',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrf6xM-8dfixY4sWxI8c9iY0OX5gIjQ_t0oNtawrb0Q&s',
        },
        {
          name: 'Chicken Adobo',
          category: 'Category Name',
          price: '₱150.00',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrf6xM-8dfixY4sWxI8c9iY0OX5gIjQ_t0oNtawrb0Q&s',
        },
        {
          name: 'Chicken Adobo',
          category: 'Category Name',
          price: '₱150.00',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrf6xM-8dfixY4sWxI8c9iY0OX5gIjQ_t0oNtawrb0Q&s',
        },
        {
          name: 'Chicken Adobo',
          category: 'Category Name',
          price: '₱150.00',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrf6xM-8dfixY4sWxI8c9iY0OX5gIjQ_t0oNtawrb0Q&s',
        },
        {
          name: 'Chicken Adobo',
          category: 'Category Name',
          price: '₱150.00',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrf6xM-8dfixY4sWxI8c9iY0OX5gIjQ_t0oNtawrb0Q&s',
        },
        {
          name: 'Chicken Adobo',
          category: 'Category Name',
          price: '₱150.00',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrf6xM-8dfixY4sWxI8c9iY0OX5gIjQ_t0oNtawrb0Q&s',
        },
        {
          name: 'Chicken Adobo',
          category: 'Category Name',
          price: '₱150.00',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrf6xM-8dfixY4sWxI8c9iY0OX5gIjQ_t0oNtawrb0Q&s',
        },
        {
          name: 'Chicken Adobo',
          category: 'Category Name',
          price: '₱150.00',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrf6xM-8dfixY4sWxI8c9iY0OX5gIjQ_t0oNtawrb0Q&s',
        },
        {
          name: 'Chicken Adobo',
          category: 'Category Name',
          price: '₱150.00',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrf6xM-8dfixY4sWxI8c9iY0OX5gIjQ_t0oNtawrb0Q&s',
        },
        {
          name: 'Chicken Adobo',
          category: 'Category Name',
          price: '₱150.00',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrf6xM-8dfixY4sWxI8c9iY0OX5gIjQ_t0oNtawrb0Q&s',
        },
        {
          name: 'Chicken Adobo',
          category: 'Category Name',
          price: '₱150.00',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrf6xM-8dfixY4sWxI8c9iY0OX5gIjQ_t0oNtawrb0Q&s',
        },

        // Add more items as needed
      ],
    };
  },
};
</script>