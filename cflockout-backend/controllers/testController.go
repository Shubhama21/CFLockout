package controllers

import(
	"github.com/gin-gonic/gin"
)

func Test() gin.HandlerFunc{
	return func(c *gin.Context){
		c.JSON(200, gin.H{"message": "Everything works fine"})
	}
}