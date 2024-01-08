<style scoped>
.br-30{
    border-radius: 30px;
}
.br-40{
    border-radius: 40px;
}
</style>

<template>
    <v-divider></v-divider>
    <v-divider></v-divider>
    <v-divider></v-divider>
    <v-container>
        <v-row>
            <v-col cols="6">
                <h1>Overview</h1> 
            </v-col>
            <v-col cols="3">
               <v-card height="65" class="br-40">
                    <v-container>
                        <v-row>
                            <v-col cols="3">
                             
                                    <v-btn class="br-40">
                                        Today
                                    </v-btn>
                               
                            </v-col>
                            <v-col cols="3">
                                <v-btn class="br-40">
                                        Week
                                    </v-btn>
                            </v-col>
                            <v-col cols="3">
                                <v-btn class="br-40">
                                        Month
                                    </v-btn>
                            </v-col>
                            <v-col cols="3">
                                <v-btn class="br-40">
                                        Year
                                    </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
               </v-card> 
            </v-col>

            <v-col cols="3">
               <v-card height="70" class="br-40">
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-btn>
                                    <v-icon>
                                        mdi-calendar-range
                                    </v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
               </v-card> 
            </v-col>

        </v-row>

        <v-row>
            <v-col cols="2">
                <v-card elevation="8"
                    class="mx-auto br-30"
                    height="200"
                >
                <v-container class="mx-auto">
                    <v-row>
                        <v-col class="mx-auto">
                            <v-icon>mdi-account-multiple</v-icon>
                            Total Users
                        </v-col>
                    </v-row>
                    <v-row>
                        <span class="text-h2 pl-15">
                            2500
                        </span>
                    </v-row>
                    <v-row>
                        <span class="text-teal pr-3 pl-13">4%</span> from last week
                    </v-row>
                </v-container>
                </v-card>
            </v-col>
            <v-col cols="2">
                <v-card elevation="8"
                    class="mx-auto br-30"
                    height="200"
                >
                <v-container class="mx-auto">
                    <v-row>
                        <v-col class="mx-auto">
                            <v-icon>mdi-account-group</v-icon>
                            Total Employees
                        </v-col>
                    </v-row>
                    <v-row>
                        <span class="text-h2 pl-15">
                            2500
                        </span>
                    </v-row>
                    <v-row>
                        <span class="text-teal pr-3 pl-13">4%</span> from last week
                    </v-row>
                </v-container>
                </v-card>
            </v-col>
            <v-col cols="2">
                <v-card elevation="8"
                    class="mx-auto br-30"
                    height="200"
                    
                    title="Card title"
                ></v-card>
            </v-col>
            <v-col cols="2">
                <v-card elevation="8"
                    class="mx-auto br-30"
                    height="200"
                    
                    title="Card title"
                ></v-card>
            </v-col>
            <v-col cols="2">
                <v-card elevation="8"
                    class="mx-auto br-30"
                    height="200"
                    
                    title="Card title"
                ></v-card>
            </v-col>
            <v-col cols="2">
                <v-card elevation="8"
                    class="mx-auto br-30"
                    height="200"
                    
                    title="Card title"
                ></v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="6">
                <v-card elevation="8" class="br-30">
                    <v-container>
                        <v-row>
                            <v-col cols="1">
                                <v-icon>
                                    mdi-lightning-bolt-outline
                                </v-icon>
                            </v-col>
                            <v-col cols="9">
                                Sample Data 1
                            </v-col>
                            <v-col cols="2">
                                <v-btn style="border-radius:50px;">
                                        <v-icon >
                                            mdi-arrow-top-right-thin
                                        </v-icon>
                                   </v-btn>
                            </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <span style="font-size: 32px; font-weight: 500;"> ₱1000.00</span>
                          </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <canvas id="myChart1" ></canvas>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
            <v-col cols="6">
                <v-card elevation="8" class="br-30">
                    <v-container>
                        <v-row>
                            <v-col cols="1">
                                <v-icon>
                                    mdi-lightning-bolt-outline
                                </v-icon>
                            </v-col>
                            <v-col cols="9">
                                Sample Data 2
                            </v-col>
                            <v-col cols="2">
                                   <v-btn style="border-radius:50px;">
                                        <v-icon>
                                            mdi-arrow-top-right-thin
                                        </v-icon>
                                   </v-btn>
                            </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <span style="font-size: 32px; font-weight: 500;"> ₱2000.00</span>
                          </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <canvas id="myChart2"></canvas>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>

        
      
    </v-container>

</template>

<script>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';

export default {
  name: 'Dashboard',
  setup() {
    const chartData1 = ref({
      labels: ['January', 'February', 'March', 'April', 'May'],
      datasets: [
        {
          label: 'Data 1',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          data: [65, 59, 80, 81, 56],
        },
      ],
    });

    const chartData2 = ref({
      labels: ['June', 'July', 'August', 'September', 'October'],
      datasets: [
        {
          label: 'Data 2',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          data: [45, 75, 60, 90, 70],
          fill: false, // Set to false for a line graph
        },
      ],
    });

    onMounted(() => {
      const ctx1 = document.getElementById('myChart1').getContext('2d');
      new Chart(ctx1, {
        type: 'bar',
        data: chartData1.value,
      });

      const ctx2 = document.getElementById('myChart2').getContext('2d');
      new Chart(ctx2, {
        type: 'line',
        data: chartData2.value,
      });
    });

    return {
      chartData1,
      chartData2,
    };
    
  },
  
};
</script>

