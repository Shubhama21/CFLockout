package helpers

import (
	"encoding/json"
	"errors"
	"fmt"
	"math/rand"
	"strconv"

	"github.com/ShivamIITK21/cflockout-backend/db"
	"github.com/ShivamIITK21/cflockout-backend/models"
)

func ProblemParser(rawData []byte) ([]models.Problem, error) {

	var responseData map[string]interface{}
	var processedProblems []models.Problem
	
	err := json.Unmarshal(rawData, &responseData)
	if err != nil {
		return processedProblems, err
	}
	responseData, ok := responseData["result"].(map[string]interface{})
	err = errors.New("error during typecast")
	if !ok {
		return processedProblems, err
	}
	
	allProblems, ok := responseData["problems"].([]interface{})
	if !ok {
		return processedProblems, err
	}

	for _, p := range allProblems{
		var prob models.Problem
		q := p.(map[string]interface{})
		prob.ContestID = uint(q["contestId"].(float64))
		index := q["index"].(string)
		prob.Index = &index
		name := q["name"].(string)
		prob.Name = &name
		rating := q["rating"]
		if rating != nil{
			rat := rating.(float64)
			prob.Rating = uint(rat)
		} else{
			rat := float64(0)
			prob.Rating = uint(rat)
		}
		tagsInt, ok := q["tags"].([]interface{})
		if !ok {
			fmt.Println("Bruh")
		}
		var tagStr string
		if len(tagsInt) > 0{
			for _, tag := range tagsInt{
				tagStr += "," + tag.(string)
			}
		}
		prob.Tags = &tagStr
		processedProblems = append(processedProblems, prob)
	}

	return processedProblems, nil
}

func GetProblemByRating(rating string) (models.Problem, error) {

	var problem models.Problem
	num, err := strconv.Atoi(rating)
	if err != nil{
		return problem, err
	}

	var problems []models.Problem
	db.DB.Where("rating = ?", uint(num)).Find(&problems)
	err = errors.New("no problem found")
	if len(problems) == 0{
		return problem, err
	}
	ind := rand.Intn(len(problems))

	return problems[ind], nil
}